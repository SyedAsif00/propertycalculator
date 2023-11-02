import React, { useState, useEffect } from "react";
import { Input, Row, Col, Form } from "antd";
import { squareInputStyle } from "./config";

function SecurityDetails() {
  const createInitialRow = () => ({
    streetAddress: "",
    suburb: "",
    state: "",
    postcode: "",
    estValue: null,
    newLVR: null,
    currentLoan: null,
    newLoan: 0,
    cashOut: 0,
  });

  const [rows, setRows] = useState([
    createInitialRow(),
    createInitialRow(),
    createInitialRow(),
    createInitialRow(),
    createInitialRow(),
  ]);

  useEffect(() => {
    const updatedRows = rows.map((row) => {
      const newLoanValue = (row.estValue * row.newLVR) / 100;
      const cashOutValue = newLoanValue - row.currentLoan;

      return {
        ...row,
        newLoan: newLoanValue,
        cashOut: cashOutValue,
      };
    });

    setRows(updatedRows);
  }, [rows]);

  const handleChange = (e, rowIndex) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[rowIndex][name] = value;
    setRows(updatedRows);
  };

  const getTotal = (key) => {
    return rows
      .reduce((acc, row) => acc + parseFloat(row[key] || 0), 0)
      .toFixed(2);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0px" }}>
      <h2>Security (property/ies offered for security)</h2>

      <Form layout="vertical">
        <Row style={{ marginBottom: "10px" }}>
          {[
            "Street Address",
            "Suburb",
            "State",
            "Postcode",
            "Est Value",
            "New LVR",
            "Current Loan",
            "New Loan",
            "Cash Out",
          ].map((header, index) => (
            <Col key={header} span={index === 0 || index === 1 ? 5 : 2}>
              <strong>{header}</strong>
            </Col>
          ))}
        </Row>

        {rows.map((row, rowIndex) => (
          <Row key={rowIndex} style={{ marginBottom: "0px" }}>
            {Object.entries(row).map(([key, value], index) => {
              if (key !== "newLoan" && key !== "cashOut") {
                return (
                  <Col key={key} span={index < 2 ? 5 : 2}>
                    <Input
                      name={key}
                      value={value}
                      onChange={(e) => handleChange(e, rowIndex)}
                      style={squareInputStyle}
                    />
                  </Col>
                );
              }
              return null;
            })}
            <Col span={2}>
              <Input
                value={row.newLoan.toFixed(2)}
                style={squareInputStyle}
                disabled
              />
            </Col>
            <Col span={2}>
              <Input
                value={row.cashOut.toFixed(2)}
                style={squareInputStyle}
                disabled
              />
            </Col>
          </Row>
        ))}

        <Row style={{ marginBottom: "10px", borderTop: "1px solid black" }}>
          <Col span={4}>
            <strong>Totals</strong>
          </Col>
          <Col span={4}></Col>
          <Col span={2}></Col>
          <Col span={2}></Col>
          <Col span={2}>
            <strong>{getTotal("estValue")}</strong>
          </Col>
          <Col span={2}>
            <strong>{getTotal("newLVR")}</strong>
          </Col>
          <Col span={2}>
            <strong>{getTotal("currentLoan")}</strong>
          </Col>
          <Col span={2}>
            <strong>{getTotal("newLoan")}</strong>
          </Col>
          <Col span={2}>
            <strong>{getTotal("cashOut")}</strong>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SecurityDetails;
