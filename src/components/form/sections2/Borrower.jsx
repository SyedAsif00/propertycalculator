import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../Form2";

const Borrower = (props) => {
  const { updateData } = useContext(DataContext);
  // Single state object to handle all fields for three rows
  const [formData, setFormData] = useState({
    row1: {
      brokerContact: "",
      borrower: "",
      guarantor: "",
      tel: "",
      email: "",
    },
    row2: {
      brokerContact: "",
      borrower: "",
      guarantor: "",
      tel: "",
      email: "",
    },
    row3: {
      brokerContact: "",
      borrower: "",
      guarantor: "",
      tel: "",
      email: "",
    },
  });

  // Function to handle form changes
  const handleChange = (row, e) => {
    const { name, value } = e.target;
    updateData("borrower", formData);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [row]: {
        ...prevFormData[row],
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    if (props.onData) {
      console.log("Borrower data:", formData);
      props.onData(formData);
    }
  }, [formData, props.onData]);

  // Function to create input for a field
  const createInput = (row, fieldName, placeholder) => (
    <input
      type="text"
      placeholder={placeholder}
      name={fieldName}
      value={formData[row][fieldName]}
      onChange={(e) => handleChange(row, e)}
    />
  );

  return (
    <div className="borrower">
      <h4>Borrower Details</h4>
      <table className="borrower_table">
        <thead>
          <tr>
            <th>Broker Contact</th>
            <th>Borrower</th>
            <th>Guarantor</th>
            <th>Tel (if applicable)</th>
            <th>Email (if applicable)</th>
          </tr>
        </thead>
        <tbody className="borrower_body">
          {[...Array(3)].map((_, index) => {
            const row = `row${index + 1}`; // row1, row2, row3
            return (
              <tr key={row}>
                <td>{createInput(row, "brokerContact", ["Name","Tel","Email"][index])}</td>
                <td>{createInput(row, "borrower", "Person/Company Name")}</td>
                <td>{createInput(row, "guarantor", "Person/Company Name")}</td>
                <td>{createInput(row, "tel", "Tel")}</td>
                <td>{createInput(row, "email", "Email")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Borrower;
