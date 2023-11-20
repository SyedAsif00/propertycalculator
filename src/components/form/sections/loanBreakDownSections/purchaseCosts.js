import React, { useState } from "react";
import formatNumberWithCommas from "./utils";

const PurchaseCosts = () => {
  const [costs, setCosts] = useState({
    sources: {
      contractPrice: 0,
      gst: 0,
      stampDuty: 0,
      depositPaid: 0,
    },
  });

  const handleInputChange = (key, value) => {
    setCosts((prevCosts) => ({
      sources: {
        ...prevCosts.sources,
        [key]: parseFloat(value) || 0,
      },
    }));
  };

  const gstAmount =
    costs.contractPrice && costs.gst
      ? (costs.contractPrice * parseFloat(costs.gst)) / 100
      : 0;

  const formatValueWithDollarSign = (value) =>
    `$${formatNumberWithCommas(value)}`;

  const total = Object.values(costs.sources).reduce(
    (acc, value) => acc + parseFloat(value ? value : 0),
    0
  );

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
            <td style={{ textAlign: "left" }}>Contract Price</td>
            <td></td>
            <td></td>
            <td
              style={{
                textAlign: "right",
                transform: "translateX(-25px)",
              }}
            >
              <input
                value={formatValueWithDollarSign(costs.contractPrice)}
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
            <td style={{ textAlign: "left" }}>GST</td>
            <td>
              <input
                style={{
                  width: "60px",
                  textAlign: "left",
                  transform: "translateX(-45px)",
                }}
                placeholder="0"
                value={`$${costs.gst}`}
                onChange={(e) =>
                  handleInputChange("gst", e.target.value?.replace("$", ""))
                }
              />
            </td>
            <td></td>
            <td
              style={{
                textAlign: "right",
                transform: "translateX(-25px)",
              }}
            >
              <input
                disabled
                value={`$${formatNumberWithCommas(gstAmount)}`}
              ></input>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}>Stamp Duty</td>
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
                {/* ... (options) */}
              </select>
            </td>
            <td></td>
            <td
              style={{
                textAlign: "right",
                transform: "translateX(-25px)",
              }}
            >
              <input
                value={formatValueWithDollarSign(costs.stampDuty)}
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
            <td style={{ textAlign: "left" }}>Deposit Paid</td>
            <td></td>
            <td></td>
            <td
              style={{
                textAlign: "right",
                transform: "translateX(-25px)",
              }}
            >
              <input
                value={formatValueWithDollarSign(costs.depositPaid)}
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
