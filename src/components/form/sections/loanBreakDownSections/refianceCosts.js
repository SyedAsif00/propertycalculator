import React, { useState } from "react";
import { Row, Col, Input, InputNumber } from "antd";

const RefinanceCosts = () => {
  const [formData, setFormData] = useState({
    firstMortgageBalanceName: "",
    firstMortgageBalanceCost: 0,
    firstMortgageFees: 0,
    secondMortgageBalanceName: "",
    secondMortgageBalanceCost: 0,
    secondMortgageFees: 0,
    creditorNames: "",
    creditorCost: 0,
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const displayValue = (value) => {
    if (!value || isNaN(value)) {
      return "($0.00)";
    }
    return `($${parseFloat(value).toFixed(2)})`;
  };

  return (
    <div>
      <h2>Refinance Costs</h2>

      <Row gutter={16} align="middle">
        <Col span={8} className="label-col">
          First Mortgage Balance
        </Col>
        <Col span={6}>
          <Input
            placeholder="Name"
            value={formData.firstMortgageBalanceName}
            onChange={(e) =>
              handleInputChange("firstMortgageBalanceName", e.target.value)
            }
          />
        </Col>
        <Col span={4}>
          <InputNumber
            value={formData.firstMortgageBalanceCost}
            onChange={(value) =>
              handleInputChange("firstMortgageBalanceCost", value)
            }
          />
        </Col>
        <Col
          span={4}
          className={formData.firstMortgageBalanceCost < 0 ? "neg" : "pos"}
        >
          {displayValue(formData.firstMortgageBalanceCost)}
        </Col>
      </Row>

      <Row gutter={16} align="middle" className="label-col">
        <Col span={8}>First Mortgage Exit/Legal Fees</Col>
        <Col span={10}>
          <InputNumber
            value={formData.firstMortgageFees}
            onChange={(value) => handleInputChange("firstMortgageFees", value)}
          />
        </Col>
        <Col
          span={4}
          className={formData.firstMortgageFees < 0 ? "neg" : "pos"}
        >
          {displayValue(formData.firstMortgageFees)}
        </Col>
      </Row>

      <Row gutter={16} align="middle">
        <Col span={8} className="label-col">
          Second Mortgage Balance
        </Col>
        <Col span={6}>
          <Input
            placeholder="Name"
            value={formData.secondMortgageBalanceName}
            onChange={(e) =>
              handleInputChange("secondMortgageBalanceName", e.target.value)
            }
          />
        </Col>
        <Col span={4}>
          <InputNumber
            value={formData.secondMortgageBalanceCost}
            onChange={(value) =>
              handleInputChange("secondMortgageBalanceCost", value)
            }
          />
        </Col>
        <Col
          span={4}
          className={formData.secondMortgageBalanceCost < 0 ? "neg" : "pos"}
        >
          {displayValue(formData.secondMortgageBalanceCost)}
        </Col>
      </Row>

      <Row gutter={16} align="middle" className="label-col">
        <Col span={8}>Second Mortgage Exit/Legal Fees</Col>
        <Col span={10}>
          <InputNumber
            value={formData.secondMortgageFees}
            onChange={(value) => handleInputChange("secondMortgageFees", value)}
          />
        </Col>
        <Col
          span={4}
          className={formData.secondMortgageFees < 0 ? "neg" : "pos"}
        >
          {displayValue(formData.secondMortgageFees)}
        </Col>
      </Row>

      <Row gutter={16} align="middle">
        <Col span={8} className="label-col">
          Payout other creditor/s
        </Col>
        <Col span={6}>
          <Input
            placeholder="Creditor Name/s"
            value={formData.creditorNames}
            onChange={(e) => handleInputChange("creditorNames", e.target.value)}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            value={formData.creditorCost}
            onChange={(value) => handleInputChange("creditorCost", value)}
          />
        </Col>
        <Col span={4} className={formData.creditorCost < 0 ? "neg" : "pos"}>
          {displayValue(formData.creditorCost)}
        </Col>
      </Row>
    </div>
  );
};

export default RefinanceCosts;
