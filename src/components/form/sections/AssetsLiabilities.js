import React, { useState, useEffect } from "react";
import { Input, Row, Col, Form } from "antd";
import { squareInputStyle } from "./config";

function AssetsLiabilities() {
  const createInitialRow = (address = "Input") => ({
    address,
    currentValue: 0,
    currentLoan: 0,
    equity: 0,
    lvr: 0,
  });

  const [rows, setRows] = useState([
    createInitialRow("Property 1"),
    createInitialRow("Property 2"),
    createInitialRow("Property 3"),
    createInitialRow("Property 4"),
    createInitialRow("Property 5"),
    createInitialRow(),
    createInitialRow(),
    createInitialRow(),
    createInitialRow("Business Value"),
    createInitialRow("Business Assets / Liabilities"),
    createInitialRow("Motor Vehicles"),
  ]);

  useEffect(() => {
    const updatedRows = rows.map((row) => {
      const equityValue = row.currentValue - row.currentLoan;
      const lvrValue = (row.currentLoan / row.currentValue) * 100;
      return {
        ...row,
        equity: equityValue,
        lvr: isFinite(lvrValue) ? lvrValue : "#DIV/0!",
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
    return rows.reduce((acc, row) => {
      if (row[key] !== "#DIV/0!") {
        return acc + parseFloat(row[key] || 0);
      }
      return acc;
    }, 0);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0px" }}>
      <h2>Assets & Liabilities</h2>

      <Form layout="vertical">
        <Row style={{ marginBottom: "10px" }}>
          {[
            "Street Address (or suburb)",
            "Current Value",
            "Current Loan",
            "Equity",
            "LVR",
          ].map((header) => (
            <Col
              key={header}
              span={header === "Street Address (or suburb)" ? 8 : 4}
            >
              <strong>{header}</strong>
            </Col>
          ))}
        </Row>

        {rows.map((row, rowIndex) => (
          <Row key={rowIndex} style={{ marginBottom: "0px" }}>
            <Col span={8}>
              <Input
                name="address"
                placeholder="Street Address"
                value={row.address}
                onChange={(e) => handleChange(e, rowIndex)}
                style={squareInputStyle}
              />
            </Col>
            {["currentValue", "currentLoan", "equity", "lvr"].map((key) => (
              <Col key={key} span={4}>
                <Input
                  name={key}
                  value={
                    key === "lvr" && row[key] !== "#DIV/0!"
                      ? `${row[key].toFixed(2)}%`
                      : row[key]
                  }
                  onChange={(e) => handleChange(e, rowIndex)}
                  style={squareInputStyle}
                  disabled={["equity", "lvr"].includes(key)}
                />
              </Col>
            ))}
          </Row>
        ))}

        <Row style={{ marginBottom: "10px", borderTop: "1px solid black" }}>
          <Col span={8}>
            <strong>Totals</strong>
          </Col>
          <Col span={4}>
            <strong>${getTotal("currentValue").toFixed(2)}</strong>
          </Col>
          <Col span={4}>
            <strong>${getTotal("currentLoan").toFixed(2)}</strong>
          </Col>
          <Col span={4}>
            <strong>${getTotal("equity").toFixed(2)}</strong>
          </Col>
          <Col span={4}>
            <strong>{getTotal("lvr").toFixed(2)}%</strong>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AssetsLiabilities;
