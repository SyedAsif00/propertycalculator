import React, { useState } from "react";
import { Row, Col, InputNumber, Select, Typography } from "antd";

const { Option } = Select;

const PurchaseCosts = () => {
  const [formData, setFormData] = useState({
    contractPrice: 0,
    gst: 12,
    stampDuty: "QLD",
    depositPaid: 0,
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const gstValue = (formData.contractPrice || 0) * (formData.gst / 100);

  return (
    <div>
      <Typography.Title level={3}>Purchase Costs</Typography.Title>

      <Row gutter={16} className="row-center">
        <Col span={8}>Contract Price</Col>
        <Col span={4}>
          <InputNumber
            value={formData.contractPrice}
            onChange={(value) => handleInputChange("contractPrice", value)}
          />
        </Col>
        <Col
          span={4}
          className={(formData.contractPrice || 0) < 0 ? "neg" : "pos"}
        >
          {`($${(formData.contractPrice || 0).toFixed(2)})`}
        </Col>
      </Row>

      <Row gutter={16} className="row-center">
        <Col span={8}>GST</Col>
        <Col span={4}>
          <InputNumber
            value={formData.gst}
            onChange={(value) => handleInputChange("gst", value)}
          />
          %
        </Col>
        <Col span={4} className={gstValue < 0 ? "neg" : "pos"}>
          {`($${gstValue.toFixed(2)})`}
        </Col>
      </Row>

      <Row gutter={16} className="row-center">
        <Col span={8}>Stamp Duty</Col>
        <Col span={4}>
          <Select
            value={formData.stampDuty}
            onChange={(value) => handleInputChange("stampDuty", value)}
          >
            <Option value="NSW">NSW</Option>
            <Option value="VIC">VIC</Option>
            <Option value="QLD">QLD</Option>
            <Option value="WA">WA</Option>
            <Option value="SA">SA</Option>
            <Option value="TAS">TAS</Option>
            <Option value="ACT">ACT</Option>
            <Option value="NT">NT</Option>
          </Select>
        </Col>
        <Col span={4} className="pos">
          $0
        </Col>
      </Row>

      <Row gutter={16} className="row-center">
        <Col span={8}>Deposit paid</Col>
        <Col span={4}>
          <InputNumber
            value={formData.depositPaid}
            onChange={(value) => handleInputChange("depositPaid", value)}
          />
        </Col>
        <Col
          span={4}
          className={(formData.depositPaid || 0) < 0 ? "neg" : "pos"}
        >
          {`($${(formData.depositPaid || 0).toFixed(2)})`}
        </Col>
      </Row>
    </div>
  );
};

export default PurchaseCosts;
