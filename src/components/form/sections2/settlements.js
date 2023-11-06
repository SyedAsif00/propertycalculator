import React, { useState } from "react";

const SettlementCosts = ({ firstMortgage = 12 }) => {
  const [costs, setCosts] = useState({
    ancillary: null,
    lenderEstabFeePercent: null,
    lenderEstabFee: null,
    brokerageFeePercent: null,
    brokerageFee: null,
    lenderLegalFee: null,
    additionalLabel1: null,
    additionalLabel2: null,
    prepaidInterestTerm: null,
    prepaidInterestRate: null,
    prepaidInterest: null,
    borrowerCashDistribution: null, // negative value as per the example given
  });

  const handleInputChange = (name, value) => {
    const floatValue = parseFloat(value);
    setCosts((prevCosts) => ({
      ...prevCosts,
      [name]: isNaN(floatValue) ? 0 : floatValue,
      lenderEstabFee: (costs.lenderEstabFeePercent * costs.ancillary) / 100,
      brokerageFee: (costs.brokerageFeePercent * costs.ancillary) / 100,
    }));
  };

  const calculatePrepaidInterest = () => {
    // Assuming a basic calculation for prepaid interest
    // This will likely need to be updated with the correct logic
    const interest =
      -(costs.prepaidInterestTerm * costs.prepaidInterestRate * firstMortgage) /
      12;
    return parseFloat(interest?.toFixed(2));
  };

  return (
    <div>
      <table className="settlement_costs" style={{ marginTop: "20px" }}>
        <tbody>
          <tr>
            <i>
              <u>Other settlements</u>
            </i>
          </tr>
          <tr>
            <td>Ancillary (overdue rates, water, land tax)</td>
            <td></td>
            <td>
              <input
                type="number"
                placeholder="$0"
                step="null1"
                value={costs.ancillary}
                onChange={(e) => handleInputChange("ancillary", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Lender Estab Fee (inc GST)</td>
            <td>
              <input
                type="number"
                placeholder="$0"
                step="null1"
                value={costs.lenderEstabFeePercent}
                onChange={(e) =>
                  handleInputChange("lenderEstabFeePercent", e.target.value)
                }
              />
              %
            </td>
            <td>${(costs.lenderEstabFeePercent * costs.ancillary) / 100}</td>
          </tr>
          <tr>
            <td>Brokerage Fee (inc GST)</td>
            <td>
              <input
                type="number"
                placeholder="$0"
                step="null1"
                value={costs.brokerageFeePercent}
                onChange={(e) =>
                  handleInputChange("brokerageFeePercent", e.target.value)
                }
              />
              %
            </td>
            <td>${(costs.brokerageFeePercent * costs.ancillary) / 100}</td>
          </tr>
          <tr>
            <td>Lender Legal Fee</td>
            <td></td>
            <td>${costs.lenderLegalFee?.toFixed(2)}</td>
          </tr>
          <tr>
            <td>
              <input
                placeholder="Label if req."
                onChange={(e) => handleInputChange("label1", e.target.value)}
              ></input>
            </td>
            <td></td>
            <td>
              {" "}
              <input
                placeholder="$0"
                onChange={(e) => handleInputChange("label1val", e.target.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <input
                placeholder="Label if req."
                onChange={(e) => handleInputChange("label2", e.target.value)}
              ></input>
            </td>
            <td></td>
            <td>
              <input
                placeholder="$0"
                onChange={(e) => handleInputChange("label2val", e.target.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <td>Prepaid Interest (Est)</td>
            <td>
              Term (m)
              <input
                type="number"
                placeholder="$0"
                value={costs.prepaidInterestTerm}
                onChange={(e) =>
                  handleInputChange("prepaidInterestTerm", e.target.value)
                }
              />
              Rate (pa)
              <input
                type="number"
                placeholder="$0"
                step="null1"
                value={costs.prepaidInterestRate}
                onChange={(e) =>
                  handleInputChange("prepaidInterestRate", e.target.value)
                }
              />
              %
            </td>
            <td>${calculatePrepaidInterest()}</td>
          </tr>
          <tr>
            <td>Borrower cash distribution</td>
            <td></td>
            <td>
              <input
                type="number"
                placeholder="$0"
                step="null1"
                value={costs.borrowerCashDistribution}
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

export default SettlementCosts;
