import React, { useState } from "react";
import { Input, Row, Col, Form, Select, DatePicker } from "antd";

function RequestedLoanTerms() {
  const { Option } = Select;

  const [formData, setFormData] = useState({
    preferredLoanTermIO: "12",
    preferredLoanTermPnI: "0",
    prepaidInterestTerm: "6",
    requestedInterestRate: "12",
    expectedProofOfIncome: "Select",
    preferredSettlementDate: null,
    criticalSettlementDate: null,
    criticalReason: "Current Loan Expires",
    criticalComments: "123",
  });

  const titles = {
    preferredLoanTermIO: "Preferred Loan Term (IO) (months)",
    preferredLoanTermPnI: "Preferred Loan Term (P&I) (years)",
    prepaidInterestTerm: "Prepaid Interest Term (months)",
    requestedInterestRate: "Requested Interest Rate",
    expectedProofOfIncome: "Expected Proof of Income",
    preferredSettlementDate: "Preferred Settlement Date",
    criticalSettlementDate: "Critical Settlement Date",
    criticalReason: "Critical Reason",
    criticalComments: "Critical Comments",
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px" }}>
      <h2>Requested Loan Terms</h2>

      <Form layout="vertical">
        {Object.keys(formData).map((key, index) => (
          <Row key={index} style={{ marginBottom: "10px" }}>
            <Col span={8}>{titles[key]}</Col>
            <Col span={8}>
              {key.includes("Date") ? (
                <DatePicker
                  style={{ width: "100%" }}
                  value={formData[key]}
                  onChange={(date) => setFormData({ ...formData, [key]: date })}
                />
              ) : key === "criticalReason" ? (
                <Select
                  value={formData[key]}
                  onChange={(value) =>
                    setFormData({ ...formData, [key]: value })
                  }
                  style={{ width: "100%" }}
                >
                  <Option value="Current Loan Expires">
                    Current Loan Expires
                  </Option>
                  <Option value="Contract Expires">Contract Expires</Option>
                  <Option value="Urgent Creditor Payment">
                    Urgent Creditor Payment
                  </Option>
                </Select>
              ) : key === "expectedProofOfIncome" ? (
                <Select
                  value={formData[key]}
                  onChange={(value) =>
                    setFormData({ ...formData, [key]: value })
                  }
                  style={{ width: "100%" }}
                >
                  <Option value="Select">Select</Option>
                  <Option value="Self-declaration Only">
                    Self-declaration Only
                  </Option>
                  <Option value="Accountants Letter">Accountants Letter</Option>
                  <Option value="Lease Doc">Lease Doc</Option>
                  <Option value="BAS">BAS</Option>
                  <Option value="Full Doc">Full Doc</Option>
                </Select>
              ) : (
                <Input
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  type={key.includes("Rate") ? "number" : "text"}
                />
              )}
            </Col>
          </Row>
        ))}
      </Form>
    </div>
  );
}

export default RequestedLoanTerms;
