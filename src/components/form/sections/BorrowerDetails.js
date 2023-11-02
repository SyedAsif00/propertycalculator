import React, { useState } from "react";
import { Input, Row, Col, Form } from "antd";

function BorrowerDetails({ data, setData }) {
  const createInitialRow = () => ({
    brokerContact: "",
    borrower: "",
    guarantor: "",
    tel: "",
    email: "",
  });

  const [rows, setRows] = useState(
    data ?? [createInitialRow(), createInitialRow(), createInitialRow()]
  );

  const handleChange = (e, rowIndex) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[rowIndex][name] = value;
    setRows(updatedRows);
    setData(updatedRows);
  };

  const squareInputStyle = {
    border: "1px solid #d9d9d9",
    borderRadius: "0px",
    height: "40px",
    padding: "3px",
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0px" }}>
      <h2>Borrower Details</h2>

      <Form layout="vertical">
        <Row style={{ marginBottom: "10px" }}>
          <Col span={5}>
            <strong>Broker Contact</strong>
          </Col>
          <Col span={5}>
            <strong>Borrower</strong>
          </Col>
          <Col span={5}>
            <strong>Guarantor</strong>
          </Col>
          <Col span={5}>
            <strong>Tel (if applicable)</strong>
          </Col>
          <Col span={4}>
            <strong>Email (if applicable)</strong>
          </Col>
        </Row>

        {rows.map((row, rowIndex) => (
          <Row key={rowIndex} style={{ marginBottom: "0px" }}>
            <Col span={5} style={{ padding: "0" }}>
              <Input
                name="brokerContact"
                value={row.brokerContact}
                onChange={(e) => handleChange(e, rowIndex)}
                style={squareInputStyle}
                placeholder="Name/Tel/Email"
              />
            </Col>
            <Col span={5} style={{ padding: "0" }}>
              <Input
                name="borrower"
                value={row.borrower}
                onChange={(e) => handleChange(e, rowIndex)}
                style={squareInputStyle}
                placeholder="Person/Company Name"
              />
            </Col>
            <Col span={5} style={{ padding: "0" }}>
              <Input
                name="guarantor"
                value={row.guarantor}
                onChange={(e) => handleChange(e, rowIndex)}
                style={squareInputStyle}
                placeholder="Person/Company Name"
              />
            </Col>
            <Col span={5} style={{ padding: "0" }}>
              <Input
                name="tel"
                value={row.tel}
                onChange={(e) => handleChange(e, rowIndex)}
                style={squareInputStyle}
                placeholder="Tel"
              />
            </Col>
            <Col span={4} style={{ padding: "0" }}>
              <Input
                name="email"
                value={row.email}
                onChange={(e) => handleChange(e, rowIndex)}
                style={squareInputStyle}
                placeholder="Email"
              />
            </Col>
          </Row>
        ))}
      </Form>
    </div>
  );
}

export default BorrowerDetails;
