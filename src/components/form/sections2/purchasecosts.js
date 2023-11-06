import React, { useState } from "react";
import formatNumberWithCommas from "./utils";

const PurchaseCosts = () => {
  const [costs, setCosts] = useState({
    contractPrice: "",
    gst: "",
    stampDuty: "",
    depositPaid: "",
  });

  const handleInputChange = (key, value) => {
    setCosts((prevCosts) => ({
      ...prevCosts,
      [key]: value === "" ? "" : parseFloat(value),
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
                type="number"
                value={costs.contractPrice}
                onChange={(e) =>
                  handleInputChange("contractPrice", e.target.value)
                }
                placeholder="$0"
              />
            </td>
          </tr>
          <tr>
            <td>GST</td>
            <td>
              <input
                type="number"
                style={{ width: "60px", textAlign: "right" }}
                placeholder="0"
                value={costs.gst}
                onChange={(e) => handleInputChange("gst", e.target.value)}
              />
              %
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
                style={{ width: "60px", transform: "translateX(28px)" }}
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
                type="number"
                value={costs.stampDuty}
                onChange={(e) => handleInputChange("stampDuty", e.target.value)}
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
                type="number"
                value={costs.depositPaid}
                onChange={(e) =>
                  handleInputChange("depositPaid", e.target.value)
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
