import React, { useState, useEffect } from "react";
import formatNumberWithCommas from "./utils";
import "./refinanceCosts.css";

const RefinanceCosts = ({ onTotalChange }) => {
  const [refinanceData, setRefinanceData] = useState({
    firstMortgageBalance: 0,
    firstMortgageExitFees: 0,
    firstMortgageCreditor: "",
    secondMortgageBalance: 0,
    secondMortgageExitFees: 0,
    secondMortgageCreditor: "",
    payoutOtherCreditors: 0,
    otherCreditorsNames: "",
  });

  const handleInputChange = (key, value) => {
    setRefinanceData((prevData) => ({
      ...prevData,
      [key]: isNaN(parseFloat(value)) ? value : parseFloat(value) || 0,
    }));
  };

  useEffect(() => {
    const total =
      refinanceData.firstMortgageBalance +
      refinanceData.firstMortgageExitFees +
      refinanceData.secondMortgageBalance +
      refinanceData.secondMortgageExitFees +
      refinanceData.payoutOtherCreditors;

    onTotalChange(total);
  }, [refinanceData, onTotalChange]);

  const formatValueWithDollarSign = (value) =>
    `$${formatNumberWithCommas(value)}`;

  return (
    <div>
      <table className="refinance_costs">
        <tbody>
          <tr>
            <td>First Mortgage Balance</td>
            <td>
              <input
                type="text"
                placeholder="Name"
                value={refinanceData.firstMortgageCreditor}
                onChange={(e) =>
                  handleInputChange("firstMortgageCreditor", e.target.value)
                }
              />
            </td>
            <td>
              <input
                type="number"
                value={refinanceData.firstMortgageBalance}
                onChange={(e) =>
                  handleInputChange("firstMortgageBalance", e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td>First Mortgage Exit/Legal Fees</td>
            <td></td>
            <td>
              <input
                type="number"
                value={refinanceData.firstMortgageExitFees}
                onChange={(e) =>
                  handleInputChange("firstMortgageExitFees", e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td>Second Mortgage Balance</td>
            <td>
              <input
                type="text"
                placeholder="Name"
                value={refinanceData.secondMortgageCreditor}
                onChange={(e) =>
                  handleInputChange("secondMortgageCreditor", e.target.value)
                }
              />
            </td>
            <td>
              <input
                type="number"
                value={refinanceData.secondMortgageBalance}
                onChange={(e) =>
                  handleInputChange("secondMortgageBalance", e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td>Second Mortgage Exit/Legal Fees</td>
            <td></td>
            <td>
              <input
                type="number"
                value={refinanceData.secondMortgageExitFees}
                onChange={(e) =>
                  handleInputChange("secondMortgageExitFees", e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td>Payout other creditor/s</td>
            <td>
              <input
                type="text"
                placeholder="Creditor Name/s"
                value={refinanceData.otherCreditorsNames}
                onChange={(e) =>
                  handleInputChange("otherCreditorsNames", e.target.value)
                }
              />
            </td>
            <td>
              <input
                type="number"
                value={refinanceData.payoutOtherCreditors}
                onChange={(e) =>
                  handleInputChange("payoutOtherCreditors", e.target.value)
                }
              />
            </td>
          </tr>
        </tbody>
        <tfoot style={{ borderTop: "1px solid black" }}>
          <tr>
            <td>
              <input value={"Total"} disabled></input>
            </td>
            <td style={{ width: "80px" }} className="bolder">
              <input
                className="bolder"
                value={formatValueWithDollarSign(
                  refinanceData.firstMortgageBalance +
                    refinanceData.firstMortgageExitFees +
                    refinanceData.secondMortgageBalance +
                    refinanceData.secondMortgageExitFees +
                    refinanceData.payoutOtherCreditors
                )}
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
