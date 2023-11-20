// RightAlignedInput.jsx
import React from "react";
import { Input } from "antd";
import "./RightAlignedInput.css";

const RightAlignedInput = ({ value, onChange, ...restProps }) => (
  <Input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="right-aligned-input"
    {...restProps}
  />
);

export default RightAlignedInput;
