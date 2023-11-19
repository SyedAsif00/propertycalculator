import React, { useState } from "react";
import formatNumberWithCommas from "./utils";
import "./refinancecosts.css";

const RefinanceCosts = () => {
  const [refinanceData, setRefinanceData] = useState({
    firstMortgageBalance: null,
    firstMortgageExitFees: null,
    firstMortgageCreditor: "",
    secondMortgageBalance: null,
    secondMortgageExitFees: null,
    secondMortgageCreditor: "",
    payoutOtherCreditors: null,
    otherCreditorsNames: "",
  });

  const handleInputChange = (key, value) => {
    setRefinanceData((prevData) => ({
      ...prevData,
      [key]: isNaN(parseFloat(value)) ? value : parseFloat(value) || 0,
    }));
  };

  // Calculate the total for refinance costs
  const total = Object.values(refinanceData).reduce(
    (acc, value) => acc + (parseFloat(value) || 0),
    0
  );

  return (
    <div>
      <table className="refinance_costs" style={{ marginTop: "20px" }}>
        <tbody>
          <tr>
            <i>
              <u>Refinance Costs</u>
            </i>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}>First Mortgage Balance</td>
            <td className="refinanceinputs">
              <input
                type="text"
                placeholder="Name"
                value={refinanceData.firstMortgageCreditor}
                onChange={(e) =>
                  handleInputChange("firstMortgageCreditor", e.target.value)
                }
              />
            </td>
            <td style={{ textAlign: "right" }}>
              <input
                placeholder="$0"
                value={`$${refinanceData.firstMortgageBalance ?? 0}`}
                onChange={(e) =>
                  handleInputChange(
                    "firstMortgageBalance",
                    e.target.value?.replace("$", "")
                  )
                }
              />
            </td>
          </tr>
          <tr>
            <td>First Mortgage Exit/Legal Fees</td>
            <td></td>
            <td style={{ textAlign: "right" }}>
              <input
                placeholder="$0"
                value={`$${refinanceData.firstMortgageExitFees ?? 0}`}
                onChange={(e) =>
                  handleInputChange(
                    "firstMortgageExitFees",
                    e.target.value?.replace("$", "")
                  )
                }
              />
            </td>
          </tr>
          <tr>
            <td>Second Mortgage Balance</td>
            <td className="refinanceinputs">
              <input
                type="text"
                placeholder="Name"
                value={refinanceData.secondMortgageCreditor}
                onChange={(e) =>
                  handleInputChange("secondMortgageCreditor", e.target.value)
                }
              />
            </td>
            <td style={{ textAlign: "right" }}>
              <input
                placeholder="$0"
                value={`$${refinanceData.secondMortgageBalance ?? 0}`}
                onChange={(e) =>
                  handleInputChange(
                    "secondMortgageBalance",
                    e.target.value?.replace("$", "")
                  )
                }
              />
            </td>
          </tr>
          <tr>
            <td>Second Mortgage Exit/Legal Fees</td>
            <td></td>
            <td style={{ textAlign: "right" }}>
              <input
                placeholder="$0"
                value={refinanceData.secondMortgageExitFees}
                onChange={(e) =>
                  handleInputChange("secondMortgageExitFees", e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td>Payout other creditor/s</td>
            <td className="refinanceinputs">
              <input
                type="text"
                style={{ width: "80px" }}
                placeholder="Creditor Name/s"
                value={refinanceData.otherCreditorsNames}
                onChange={(e) =>
                  handleInputChange("otherCreditorsNames", e.target.value)
                }
              />
            </td>
            <td style={{ textAlign: "right" }}>
              <input
                placeholder="$0"
                className="right"
                value={`$${refinanceData.payoutOtherCreditors}`}
                onChange={(e) =>
                  handleInputChange(
                    "payoutOtherCreditors",
                    e.target.value?.replace("$", "")
                  )
                }
              />
            </td>
          </tr>
        </tbody>
        <tfoot style={{ borderTop: "1px solid black" }}>
          <tr>
            <td style={{ transform: "translateX(30px)" }}>
              <input value={"Total"} disabled></input>
            </td>
            <td
              style={{
                width: "80px",
                transform: "translateX(240px)",
                textAlign: "right",
              }}
              className="bolder"
            >
              <input
                className="bolder"
                value={"$" + formatNumberWithCommas(total)}
                disabled
              ></input>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default RefinanceCosts;
