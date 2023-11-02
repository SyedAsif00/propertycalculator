import React, { useState } from "react";
import { Row, Col, Input, InputNumber } from "antd";

const OtherSettlementCosts = ({ mortgage = 10000 }) => {
  const [formData, setFormData] = useState({
    ancillary: 0,
    lenderEstabFeeRate: 0,
    brokerageFeeRate: 0,
    label1: "",
    label2: "",
    prepaidInterestTerm: 0,
    prepaidInterestRate: 0,
    borrowerCashDistribution: -43520,
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const calculateFee = (rate, value) => {
    return (rate / 100) * value;
  };

  const displayValue = (value) => {
    if (!value || isNaN(value)) {
      return "$0.00";
    }
    return parseFloat(value).toFixed(2);
  };

  return (
    <div>
      <h2>Other Settlement Costs</h2>

      <Row gutter={16} align="middle">
        <Col span={10}>Ancillary (overdue rates, water, land tax)</Col>
        <Col
          span={4}
          style={{ color: formData.ancillary < 0 ? "red" : "green" }}
        >
          {displayValue(formData.ancillary)}
        </Col>
        <Col span={10}>
          <InputNumber
            value={formData.ancillary}
            onChange={(value) => handleInputChange("ancillary", value)}
          />
        </Col>
      </Row>

      <Row gutter={16} align="middle">
        <Col span={10}>Lender Estab Fee (inc GST)</Col>
        <Col
          span={4}
          style={{
            color:
              calculateFee(formData.lenderEstabFeeRate, mortgage) < 0
                ? "red"
                : "green",
          }}
        >
          {displayValue(calculateFee(formData.lenderEstabFeeRate, mortgage))}
        </Col>
        <Col span={10}>
          <InputNumber
            value={formData.lenderEstabFeeRate}
            onChange={(value) => handleInputChange("lenderEstabFeeRate", value)}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
          />
        </Col>
      </Row>

      <Row gutter={16} align="middle">
        <Col span={10}>Brokerage Fee (inc GST)</Col>
        <Col
          span={4}
          style={{
            color:
              calculateFee(formData.brokerageFeeRate, mortgage) < 0
                ? "red"
                : "green",
          }}
        >
          {displayValue(calculateFee(formData.brokerageFeeRate, mortgage))}
        </Col>
        <Col span={10}>
          <InputNumber
            value={formData.brokerageFeeRate}
            onChange={(value) => handleInputChange("brokerageFeeRate", value)}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
          />
        </Col>
      </Row>

      <Row gutter={16} align="middle">
        <Col span={10}>Lender Legal Fee</Col>
        <Col
          span={4}
          style={{ color: formData.lenderLegalFee < 0 ? "red" : "green" }}
        >
          {displayValue(formData.lenderLegalFee)}
        </Col>
        <Col span={10}>
          <InputNumber
            value={formData.lenderLegalFee}
            onChange={(value) => handleInputChange("lenderLegalFee", value)}
          />
        </Col>
      </Row>

      <Row gutter={16} align="middle">
        <Col span={10}>Label if req.</Col>
        <Col span={14}>
          <Input
            value={formData.label1}
            onChange={(e) => handleInputChange("label1", e.target.value)}
          />
        </Col>
      </Row>

      <Row gutter={16} align="middle">
        <Col span={10}>Label if req.</Col>
        <Col span={14}>
          <Input
            value={formData.label2}
            onChange={(e) => handleInputChange("label2", e.target.value)}
          />
        </Col>
      </Row>

      <Row gutter={16} align="middle">
        <Col span={10}>Prepaid Interest (Est)</Col>
        <Col
          span={4}
          style={{ color: formData.prepaidInterest < 0 ? "red" : "green" }}
        >
          {displayValue(formData.prepaidInterest)}
        </Col>
        <Col span={3}>
          <InputNumber
            value={formData.prepaidInterestTerm}
            onChange={(value) =>
              handleInputChange("prepaidInterestTerm", value)
            }
            placeholder="Term (m)"
          />
        </Col>
        <Col span={3}>
          <InputNumber
            value={formData.prepaidInterestRate}
            onChange={(value) =>
              handleInputChange("prepaidInterestRate", value)
            }
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
            placeholder="Rate (pa)"
          />
        </Col>
      </Row>

      <Row gutter={16} align="middle">
        <Col span={10}>Borrower cash distribution</Col>
        <Col
          span={4}
          style={{
            color: formData.borrowerCashDistribution < 0 ? "red" : "green",
          }}
        >
          {displayValue(formData.borrowerCashDistribution)}
        </Col>
        <Col span={10}>
          <InputNumber
            value={formData.borrowerCashDistribution}
            onChange={(value) =>
              handleInputChange("borrowerCashDistribution", value)
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default OtherSettlementCosts;
