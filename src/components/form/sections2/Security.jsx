import React, { useEffect, useState } from "react";
import formatNumberWithCommas from "./utils";

const getDefaultRow = () => ({
  estValue: 0,
  newLVR: 0,
  newLoan: 0,
  currentLoan: 0,
  cashOut: 0,
});

const PropertyInput = ({ index, onChange, value }) => (
  <input
    type="text"
    placeholder={`$0`}
    value={value === 0 ? "" : `$${value}`}
    onChange={(e) => onChange(index, e.target.value.replace(/\$/g, ""))}
  />
);

const Security = (props) => {
  let [propertyInfo, setPropertyInfo] = useState([
    getDefaultRow(),
    getDefaultRow(),
    getDefaultRow(),
    getDefaultRow(),
    getDefaultRow(),
  ]);

  const handlePropertyInfoChange = (index, property) => {
    const updatedPropertyInfo = [...propertyInfo];
    updatedPropertyInfo[index] = property;
    setPropertyInfo(updatedPropertyInfo);
  };

  useEffect(() => {
    // calculate the other stuff
    propertyInfo = propertyInfo.map((property) => {
      return {
        ...property,
        newLoan: property.estValue * (property.newLVR / 100),
        cashOut: -property.currentLoan + property.newLoan,
      };
    });
  }, [propertyInfo, props]);

  console.log(propertyInfo);
  return (
    <div className="borrower_body">
      <h4>Security (property/ies offered for security)</h4>
      <table className="borrower_head">
        <thead>
          <tr>
            <th style={{ width: "15%" }}>Street Address</th>
            <th>Suburb</th>
            <th style={{ width: "15%" }}>State</th>
            <th>Postcode</th>
            <th>Est Value</th>
            <th className="smaller">New LVR</th>
            <th className="smaller">New Loan</th>
            <th className="smaller">Current Loan</th>
            <th className="smaller">Cash Out</th>
          </tr>
        </thead>
        <tbody className="borrower_body">
          {propertyInfo.map((property, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  placeholder="Street Address"
                  onInput={(e) =>
                    handlePropertyInfoChange(index, {
                      ...property,
                      street: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Suburb"
                  onInput={(e) =>
                    handlePropertyInfoChange(index, {
                      ...property,
                      suburb: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <select
                  style={{
                    width: "60%",
                    border: "none",
                    outline: "none",
                    color: "#6b79ff",
                    fontSize: "12px",
                  }}
                  onChange={(e) =>
                    handlePropertyInfoChange(index, {
                      ...property,
                      state: e.target.value,
                    })
                  }
                >
                  <option value="State" disabled selected>
                    State
                  </option>
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
              <td>
                <input type="text" placeholder="Postcode" />
              </td>
              <td>
                <PropertyInput
                  index={index}
                  value={property.estValue}
                  onChange={(e, val) =>
                    handlePropertyInfoChange(index, {
                      ...property,
                      estValue: val,
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="New LVR"
                  value={`${property.newLVR}%`}
                  onChange={(e) => {
                    handlePropertyInfoChange(index, {
                      ...property,
                      newLVR: parseFloat(e.target.value?.replace("%", "")) || 0,
                    });
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="New Loan"
                  value={`$${property.newLoan}`}
                  disabled
                />
              </td>
              <td>
                <PropertyInput
                  index={index}
                  value={property.currentLoan}
                  onChange={(e, value) =>
                    handlePropertyInfoChange(index, {
                      ...property,
                      currentLoan: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Cash Out"
                  style={{ color: property.cashOut < 0 && "red" }}
                  value={`$${Math.abs(property.cashOut?.toFixed(0))}`}
                  disabled
                />
              </td>
            </tr>
          ))}
          {/* Final */}
          <tr style={{ borderTop: "1px solid black" }}>
            <td>
              <input
                type="text"
                placeholder="Totals"
                disabled
                className="bolder"
              />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <input
                type="text"
                placeholder={`$${formatNumberWithCommas(
                  propertyInfo
                    ?.reduce(
                      (acc, property) =>
                        Number(acc) + Number(property?.estValue || 0),
                      0
                    )
                    .toFixed(2)
                )}`}
                disabled
                className="bolder"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder={`${propertyInfo?.reduce(
                  (acc, property) =>
                    Number(acc) + Number(property?.newLVR || 0),
                  0
                )}%`}
                disabled
                className="bolder"
              />
            </td>
            <td>
              <input type="text" placeholder="$0" disabled className="bolder" />
            </td>
            <td>
              <input
                type="text"
                placeholder={`$${formatNumberWithCommas(
                  propertyInfo?.reduce(
                    (acc, property) =>
                      Number(acc) + Number(property?.currentLoan || 0),
                    0
                  )
                )}`}
                disabled
                className="bolder"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder={`$${formatNumberWithCommas(
                  propertyInfo?.reduce(
                    (acc, property) =>
                      Number(acc) +
                      Number(
                        (property?.currentLoan || 0) - (property?.estValue || 0)
                      ),
                    0
                  )
                )}`}
                disabled
                className="bolder"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Security;
