import React, { useState } from "react";
import formatNumberWithCommas from "./utils";

const PurchaseCosts = () => {
  const [costs, setCosts] = useState({
    contractPrice: 0,
    gst: 0,
    stampDuty: 0,
    depositPaid: 0,
  });

  const handleInputChange = (key, value) => {
    setCosts((prevCosts) => ({
      ...prevCosts,
      [key]: value,
    }));
  };

  const gstAmount =
    costs.contractPrice && costs.gst
      ? (costs.contractPrice * costs.gst) / 100
      : 0;

  return (
    <div>
      <table className="purchase_costs" style={{ marginTop: "20px" }}>
        <tbody>
          <tr>
            <th>Costs/Uses of Money</th>
          </tr>
          <tr>
            <td style={{ textDecoration: "underline" }}>
              <i>Purchase Costs</i>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Contract Price</td>
            <td></td>
            <td></td>
            <td style={{ textAlign: "right" }}>
              <input
                value={`$${costs.contractPrice ?? 0}`}
                className={costs.contractPrice < 0 && "redify"}
                onChange={(e) =>
                  handleInputChange(
                    "contractPrice",
                    e.target.value?.replace("$", "")
                  )
                }
                placeholder="$0"
              />
            </td>
          </tr>
          <tr>
            <td>GST</td>
            <td>
              <input
                style={{
                  width: "60px",
                  textAlign: "left",
                  transform: "translateX(-45px)",
                }}
                placeholder="0"
                value={`${costs.gst}%`}
                onChange={(e) =>
                  handleInputChange("gst", e.target.value?.replace("%", ""))
                }
              />
            </td>
            <td></td>
            <td style={{ textAlign: "right" }}>
              <input
                disabled
                value={`$${formatNumberWithCommas(gstAmount)}`}
              ></input>
            </td>
          </tr>
          <tr>
            <td>Stamp Duty</td>
            <td>
              <select
                style={{
                  width: "60px",
                  transform: "translateX(-45px)",
                  textAlign: "left",
                }}
                onChange={(e) =>
                  handleInputChange("stampDutyState", e.target.value)
                }
              >
                <option value="NSW">NSW</option>
                <option value="VIC">VIC</option>
                <option value="QLD">QLD</option>
                <option value="WA">WA</option>
                <option value="SA">SA</option>
                <option value="TAS">TAS</option>
                <option value="ACT">ACT</option>
                <option value="NT">NT</option>
              </select>
            </td>
            <td></td>
            <td style={{ textAlign: "right" }}>
              <input
                value={`$${costs.stampDuty ?? 0}`}
                onChange={(e) =>
                  handleInputChange(
                    "stampDuty",
                    e.target.value?.replace("$", "")
                  )
                }
                placeholder="$0"
              />
            </td>
          </tr>
          <tr>
            <td>Deposit Paid</td>
            <td></td>
            <td></td>
            <td style={{ textAlign: "right" }}>
              <input
                value={`$${costs.depositPaid ?? 0}`}
                className={costs.depositPaid < 0 && "redify"}
                onChange={(e) =>
                  handleInputChange(
                    "depositPaid",
                    e.target.value?.replace("$", "")
                  )
                }
                placeholder="$0"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseCosts;
