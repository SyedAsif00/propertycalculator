import React, { useState } from "react";
import { Input, Row, Col, Form, Checkbox } from "antd";

function ExpectedIssues() {
  const issuesList = [
    "Credit History",
    "Loan Repayment History",
    "LVR",
    "Rate expectations",
  ];

  const initialState = issuesList.reduce((acc, issue) => {
    acc[issue] = { ticked: false, comment: "" };
    return acc;
  }, {});

  const [issuesState, setIssuesState] = useState(initialState);

  const handleCheckChange = (issue) => {
    setIssuesState((prevState) => ({
      ...prevState,
      [issue]: { ...prevState[issue], ticked: !prevState[issue].ticked },
    }));
  };

  const handleCommentChange = (e, issue) => {
    const comment = e.target.value;
    setIssuesState((prevState) => ({
      ...prevState,
      [issue]: { ...prevState[issue], comment },
    }));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0px" }}>
      <h2>Expected Issues to Overcome</h2>

      <Form layout="vertical">
        {issuesList.map((issue) => (
          <Row key={issue} style={{ marginBottom: "10px" }}>
            <Col span={8}>{issue}</Col>
            <Col span={8}>
              <Checkbox
                onChange={() => handleCheckChange(issue)}
                checked={issuesState[issue].ticked}
              >
                Tick
              </Checkbox>
            </Col>
            <Col span={8}>
              <Input
                placeholder="Optional comment"
                value={issuesState[issue].comment}
                onChange={(e) => handleCommentChange(e, issue)}
                disabled={!issuesState[issue].ticked}
              />
            </Col>
          </Row>
        ))}
      </Form>
    </div>
  );
}

export default ExpectedIssues;
