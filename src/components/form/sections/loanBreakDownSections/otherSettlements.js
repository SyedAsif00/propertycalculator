import React, { useState } from "react";

const OtherSettlementCosts = ({ mortgage = 10000 }) => {
  const [formData, setFormData] = useState({
    ancillary: 0,
    lenderEstabFeeRate: 0,
    brokerageFeeRate: 0,
    label1: "",
    label2: "",
    prepaidInterestTerm: 0,
    prepaidInterestRate: 0,
    lenderLegalFee: 0,
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

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ancillary (overdue rates, water, land tax)</td>
            <td style={{ textAlign: "right" }}>
              <input
                value={`$${formData.ancillary ?? 0}`}
                onChange={(e) =>
                  handleInputChange(
                    "ancillary",
                    e.target.value?.replace("$", "")
                  )
                }
              />
            </td>
          </tr>
          <tr>
            <td>Lender Estab Fee (inc GST)</td>
            <td>
              <input
                type="number"
                value={formData.lenderEstabFeeRate}
                onChange={(e) =>
                  handleInputChange("lenderEstabFeeRate", e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td>Brokerage Fee (inc GST)</td>
            <td>
              <input
                type="number"
                value={formData.brokerageFeeRate}
                onChange={(e) =>
                  handleInputChange("brokerageFeeRate", e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td>Lender Legal Fee</td>
            <td>
              <input
                type="number"
                value={formData.lenderLegalFee}
                onChange={(e) =>
                  handleInputChange("lenderLegalFee", e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td>Label if req.</td>
            <td>
              <input
                type="text"
                value={formData.label1}
                onChange={(e) => handleInputChange("label1", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Label if req.</td>
            <td>
              <input
                type="text"
                value={formData.label2}
                onChange={(e) => handleInputChange("label2", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Prepaid Interest (Est)</td>
            <td>
              <input
                type="number"
                value={formData.prepaidInterestTerm}
                onChange={(e) =>
                  handleInputChange("prepaidInterestTerm", e.target.value)
                }
                placeholder="Term (m)"
              />
              <input
                type="number"
                value={formData.prepaidInterestRate}
                onChange={(e) =>
                  handleInputChange("prepaidInterestRate", e.target.value)
                }
                placeholder="Rate (pa)"
              />
            </td>
          </tr>
          <tr>
            <td>Borrower cash distribution</td>
            <td>
              <input
                type="number"
                value={formData.borrowerCashDistribution}
                onChange={(e) =>
                  handleInputChange("borrowerCashDistribution", e.target.value)
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OtherSettlementCosts;
