import React, { useState } from "react";
import { Row, Col, Typography, Input } from "antd";
import PurchaseCosts from "./loanBreakDownSections/purchaseCosts";
import RefinanceCosts from "./loanBreakDownSections/refianceCosts";
import OtherSettlementCosts from "./loanBreakDownSections/otherSettlements";

function RequestedLoanBreakdown({ status, values }) {
  const [note, setNote] = useState(""); // Adding state for the note
  const labels = [
    "First Mortgage Loan Advance",
    "Vendor/Second Mortgage Loan Advance",
    "Borrower Cash Contribution",
    "Total Sources",
  ];

  // Handle input change
  const handleInputChange = (e) => {
    setNote(e.target.value);
  };

  console.log(status, values, note); // Logging the note along with other values

  return (
    <div style={{ maxWidth: "800px", margin: "0" }}>
      <h2>Requested Loan Breakdown</h2>
      <div style={{ marginLeft: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>Sources of Money</Typography.Title>
          </Col>
        </Row>

        {labels.map((label, index) =>
          status[index] && values[index] ? (
            <Row key={index} style={{ marginBottom: "10px" }}>
              <Col span={12}>
                <Typography.Text>{label}</Typography.Text>
              </Col>
              <Col span={6}>
                <Typography.Text>{status[index]}</Typography.Text>
              </Col>
              <Col span={6}>
                <Typography.Text>{values[index]}</Typography.Text>
              </Col>
            </Row>
          ) : null
        )}

        <Row style={{ marginTop: "20px" }}>
          <Col span={12}>
            <Typography.Text>
              Note: If Net Cashflow is 0, type the number here (as Positive)
            </Typography.Text>
            <Input
              placeholder="Enter Number"
              value={note}
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        <section>
          <PurchaseCosts />
          <RefinanceCosts />
          <OtherSettlementCosts />
        </section>
      </div>
    </div>
  );
}

export default RequestedLoanBreakdown;
