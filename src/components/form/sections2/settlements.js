import React, { useContext, useState } from "react";
import { DataContext } from "../Form2";

const SettlementCosts = ({}) => {
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
  const {
    data: { firstMortgage = null },
  } = useContext(DataContext);

  const handleInputChange = (name, value) => {
    const floatValue = parseFloat(value);
    setCosts((prevCosts) => ({
      ...prevCosts,
      [name]: isNaN(floatValue) ? 0 : floatValue,
      lenderEstabFee: (costs.lenderEstabFeePercent * firstMortgage) / 100,
      brokerageFee: (costs.brokerageFeePercent * costs.ancillary) / 100,
    }));
  };

  console.log(costs, firstMortgage);
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
            <td style={{ textAlign: "right" }}>
              <input
                placeholder="$0"
                value={`$${costs.ancillary ?? 0}`}
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
                placeholder="$0"
                value={`${costs.lenderEstabFeePercent ?? 0}%`}
                onChange={(e) =>
                  handleInputChange(
                    "lenderEstabFeePercent",
                    e.target.value?.replace("%", "")
                  )
                }
              />
            </td>
            <td style={{ textAlign: "right" }}>
              <input
                className="reee"
                disabled
                value={`$
                ${costs.lenderEstabFee}
                `}
              />
            </td>
          </tr>
          <tr>
            <td>Brokerage Fee (inc GST)</td>
            <td>
              <input
                placeholder="$0"
                value={`${costs.brokerageFeePercent ?? 0}%`}
                onChange={(e) =>
                  handleInputChange(
                    "brokerageFeePercent",
                    e.target.value?.replace("%", "")
                  )
                }
              />
            </td>
            <td style={{ textAlign: "right" }}>
              <input
                disabled
                value={`$${
                  (costs.brokerageFeePercent * costs.ancillary) / 100
                }`}
              />
            </td>
          </tr>
          <tr>
            <td>Lender Legal Fee</td>
            <td></td>
            <td style={{ textAlign: "right" }}>
              <input
                disabled
                value={`$${costs.lenderLegalFee?.toFixed(2) ?? 0}`}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                placeholder="Label if req."
                className="labelifreq"
                onChange={(e) => handleInputChange("label1", e.target.value)}
              ></input>
            </td>
            <td></td>
            <td style={{ textAlign: "right" }}>
              <input
                placeholder="$0"
                value={`$${costs.label2val ?? 0}`}
                onChange={(e) =>
                  handleInputChange(
                    "label2val",
                    e.target.value?.replace("$", "")
                  )
                }
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <input
                placeholder="Label if req."
                className="labelifreq"
                onChange={(e) => handleInputChange("label2", e.target.value)}
              ></input>
            </td>
            <td></td>
            <td style={{ textAlign: "right" }}>
              <input
                placeholder="$0"
                value={`$${costs.label2val ?? 0}`}
                onChange={(e) =>
                  handleInputChange(
                    "label2val",
                    e.target.value?.replace("$", "")
                  )
                }
              ></input>
            </td>
          </tr>
          <tr>
            <td>Prepaid Interest (Est)</td>
            <td>
              Term (m)
              <input
                type="number"
                placeholder="0"
                value={costs.prepaidInterestTerm}
                onChange={(e) =>
                  handleInputChange("prepaidInterestTerm", e.target.value)
                }
              />
              Rate (pa)
              <input
                value={`${costs.prepaidInterestRate ?? 0}%`}
                onChange={(e) =>
                  handleInputChange(
                    "prepaidInterestRate",
                    e.target.value?.replace("%", "")
                  )
                }
              />
            </td>
            <td style={{ textAlign: "right" }}>
              <input disabled value={`$${calculatePrepaidInterest()}`}></input>
            </td>
          </tr>
          <tr>
            <td>Borrower cash distribution</td>
            <td></td>
            <td style={{ textAlign: "right" }}>
              <input
                placeholder="$0"
                value={`${costs.borrowerCashDistribution ?? 0}%`}
                onChange={(e) =>
                  handleInputChange(
                    "borrowerCashDistribution",
                    e.target.value?.replace("%", "")
                  )
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
