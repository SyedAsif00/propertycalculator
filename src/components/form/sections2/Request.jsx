import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../Form2";
import "./request.css";

const Request = ({ initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);
  const { updateData } = useContext(DataContext);

  useEffect(() => {
    // You can perform any necessary actions with formData here
    console.log("Form data updated:", formData);
  }, [formData]);

  const handleInputChange = (fieldName, value) => {
    updateData("request", {
      ...formData,
      [fieldName]: value,
    });
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const renderInputRow = (
    fieldName,
    label,
    placeholder,
    inputType = "text",
    inputProps = {}
  ) => (
    <tr>
      <td>
        <input type="text" placeholder={label} disabled />
      </td>
      <td className="request-td">
        {inputType === "select" ? (
          <select
          {...inputProps}
            className="fifty-width"
            value={formData[fieldName]}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
          >
            {inputProps.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...inputProps}
            className="fifty-width"
            type={inputType}
            placeholder={placeholder}
            value={formData[fieldName]}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
          />
        )}
      </td>
    </tr>
  );

  return (
    <div className="request_container">
      <h4>Requested Loan Terms</h4>
      <table className="borrower_head" >
        <tbody className="borrower_body">
          {renderInputRow(
            "loanTermIO",
            "Preferred Loan Term (IO)",
            "12 months"
          )}
          {renderInputRow("loanTermPI", "Preferred Loan Term (P&I)", "0 years")}
          {renderInputRow(
            "prepaidInterestTerm",
            "Prepaid Interest Term",
            "6 months"
          )}
          {renderInputRow(
            "interestRate",
            "Requested Interest Rate",
            "0% per annum"
          )}

          {renderInputRow(
            "proofOfIncome",
            "Expected Proof of Income",
            "",
            "select",
            {
              options: [
                "Select",
                "Self Declaration Only",
                "Accountants Letter",
                "Lease Doc",
                "BAS",
                "Full Doc",
              ],
              style: {
                // Adjust width to fill the entire cell
                border: "none",
                outline: "none",
                color: "#6b79ff",
                fontSize: "11px",
              },
            }
          )}

          {renderInputRow(
            "settlementDate",
            "Preferred Settlement Date",
            "",
            "date",
            { style: { color: "blue" } }
          )}

          {renderInputRow(
            "criticalSettlementDate",
            "Critical Settlement Date",
            "",
            "date",
            {
              className: "pinkify",
              style: { color: "#d76060" },
            }
          )}

          {renderInputRow("criticalReason", "Critical Reason", "", "select", {
            options: [
              "Select",
              "Current Loan Expires",
              "Contract Expires",
              "Urgent Creditor Payment",
            ],
            style: {
              // Adjust width to fill the entire cell
              border: "none",
              outline: "none",
              color: "#d76060",
              fontSize: "11px",
            },
            className: "pinkify",
          })}

          {renderInputRow("criticalComments", "Critical Comments", "", "text", {
            className: "pinkify redify",
            style:{color:"rgb(215, 96, 96)"}
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Request;
