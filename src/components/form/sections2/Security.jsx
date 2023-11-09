import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Form2";
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
  const [propertyInfo, setPropertyInfo] = useState([
    getDefaultRow(),
    getDefaultRow(),
    getDefaultRow(),
    getDefaultRow(),
    getDefaultRow(),
  ]);

  const cashOut = propertyInfo?.reduce(
    (acc, property) =>
      Number(acc) +
      Number((property?.currentLoan || 0) - (property?.estValue || 0)),
    0
  );
  const { updateData } = useContext(DataContext);

  const handlePropertyInfoChange = (index, updatedProperty) => {
    const updatedPropertyInfo = [...propertyInfo];
    updatedPropertyInfo[index] = updatedProperty;
    setPropertyInfo(updatedPropertyInfo);
    updateData("security", updatedPropertyInfo);
  };

  useEffect(() => {
    // calculate the other stuff
    const updatedPropertyInfo = propertyInfo.map((property) => {
      return {
        ...property,
        newLoan: property.estValue * (property.newLVR / 100),
        cashOut:
          -property.currentLoan + property.estValue * (property.newLVR / 100),
      };
    });
    updateData(
      "firstMortgage",
      updatedPropertyInfo?.reduce(
        (acc, property) => Number(acc) + Number(property?.newLoan || 0),
        0
      )
    );
    setPropertyInfo(updatedPropertyInfo);
  }, [propertyInfo, props]);

  return (
    <div className="borrower_body">
      <h4>Security (property/ies offered for security)</h4>
      <table className="borrower_head">
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Street Address</th>
            <th style={{ width: "10%" }}>Suburb</th>
            <th style={{ width: "10%" }}>State</th>
            <th style={{ width: "10%" }}>Postcode</th>
            <th style={{ width: "10%" }}>Est Value</th>
            <th style={{ width: "10%" }}>New LVR</th>
            <th style={{ width: "10%" }}>New Loan</th>
            <th style={{ width: "12%" }}>Current Loan</th>
            <th style={{ width: "10%" }}>Cash Out</th>
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
                    width: "100%",
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
                  className="color-blue"
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
                      currentLoan: parseFloat(value) || 0,
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Cash Out"
                  className={property.cashOut < 0 && "redify"}
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
              <input
                type="text"
                disabled
                className="bolder"
                placeholder={`$${formatNumberWithCommas(
                  propertyInfo?.reduce(
                    (acc, property) =>
                      Number(acc) + Number(property?.newLoan || 0),
                    0
                  )?.toFixed(2)
                )}`}
              />
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
                className={cashOut < 0 ? "redify bolder" : "bolder"}
                placeholder={`$${formatNumberWithCommas(
                  Math.abs(cashOut)
                )}`}
                disabled
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Security;
