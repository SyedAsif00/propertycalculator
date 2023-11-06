import React, { useState } from "react";
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
                placeholder="$0"
                className="right"
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
                placeholder="$0"
                className="right"
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
                placeholder="$0"
                className="right"
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
                placeholder="$0"
                className="right"
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
                placeholder="$0"
                className="right"
                type="number"
                value={refinanceData.payoutOtherCreditors}
                onChange={(e) =>
                  handleInputChange("payoutOtherCreditors", e.target.value)
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RefinanceCosts;
