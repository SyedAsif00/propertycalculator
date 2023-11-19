import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Form2";

const Assets = ({ initialData }) => {
  const { updateData } = useContext(DataContext);
  const defaultData = {
    properties: [
      {
        name: "Property 1",
        currentValue: 0,
        currentLoan: 0,
      },
      {
        name: "Property 2",
        currentValue: 0,
        currentLoan: 0,
      },
      {
        name: "Property 3",
        currentValue: 0,
        currentLoan: 0,
      },
      {
        name: "Property 4",
        currentValue: 0,
        currentLoan: 0,
      },
      {
        name: "Property 5",
        currentValue: 0,
        currentLoan: 0,
      },
      {
        name: "Input",
        currentValue: 0,
        currentLoan: 0,
      },
      {
        name: "Input",
        currentValue: 0,
        currentLoan: 0,
      },
      {
        name: "Input",
        currentValue: 0,
        currentLoan: 0,
      },
      {
        name: "Business Value",
        currentValue: 0,
        currentLoan: 0,
      },
      {
        name: "Business Assets/Liabilities",
        currentValue: 0,
        currentLoan: 0,
      },
      {
        name: "Motor Vehicles",
        currentValue: 0,
        currentLoan: 0,
      },
    ],
  };

  const [properties, setProperties] = useState(
    initialData?.properties || defaultData.properties
  );

  const handlePropertyValueChange = (index, value) => {
    const updatedProperties = [...properties];
    updatedProperties[index].currentValue = parseFloat(value) || 0;
    updateData("properties", updatedProperties);
    setProperties(updatedProperties);
  };

  const handleLoanValueChange = (index, value) => {
    const updatedProperties = [...properties];
    updatedProperties[index].currentLoan = parseFloat(value) || 0;
    updateData("properties", updatedProperties);
    setProperties(updatedProperties);
  };

  const handleNameChange = (index, value) => {
    const updatedProperties = [...properties];
    updatedProperties[index].name = value;
    updateData("properties", updatedProperties);
    setProperties(updatedProperties);
  };

  useEffect(() => {
    if (initialData) {
      setProperties(initialData.properties);
    }
  }, [initialData]);

  const calculateEquityValue = () => {
    const totalEquity = properties.reduce((acc, property) => {
      return acc + (property.currentValue - property.currentLoan);
    }, 0);
    return totalEquity.toFixed(2);
  };
  const calculateLVR = () => {
    let val = 0;
    properties.forEach((property) => {
      !isNaN((property.currentLoan / property.currentValue) * 100) &&
        (val += (property.currentLoan / property.currentValue) * 100);
    });
    return val.toFixed(2);
  };

  return (
    <div>
      <h4>Assets & Liabilities</h4>
      <h4>Assets & Liabilities</h4>
      <table className="borrower_head">
        <thead>
          <tr>
            <th>Street address (or Suburb)</th>
            <th>Current value</th>
            <th>Current Loan</th>
            <th>Equity</th>
            <th>LVR</th>
          </tr>
        </thead>
        {/* Add your table body here */}

        <tbody className="borrower_body">
          {properties.map((property, index) => (
            <tr key={index}>
              <td style={{ width: "30%" }}>
                <input
                  type="text"
                  placeholder={property.name}
                  // value={property.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                />
              </td>
              <td style={{ paddingLeft: "8%" }}>
                <input
                  type="text"
                  placeholder="$0"
                  value={
                    property.currentValue === 0
                      ? ""
                      : `$${property.currentValue}`
                  }
                  onChange={(e) =>
                    handlePropertyValueChange(
                      index,
                      e.target.value.replace(/\$/g, "")
                    )
                  }
                />
              </td>
              <td style={{ paddingLeft: "8%" }}>
                <input
                  type="text"
                  placeholder="$0"
                  value={
                    property.currentLoan === 0 ? "" : `$${property.currentLoan}`
                  }
                  onChange={(e) =>
                    handleLoanValueChange(
                      index,
                      e.target.value.replace(/\$/g, "")
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className={
                    property.currentValue - property.currentLoan < 0 &&
                    "pinkify redify"
                  }
                  placeholder={`$${Math.abs(
                    property.currentValue - property.currentLoan
                  ).toFixed(2)}`}
                  disabled
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder={`${
                    property.currentValue === 0
                      ? "N/A"
                      : (
                          (property.currentLoan / property.currentValue) *
                          100
                        ).toFixed(2) + "%"
                  }`}
                  disabled
                />
              </td>
            </tr>
          ))}
          <tr style={{ borderTop: "1px solid black" }}>
            <td>
              <input
                type="text"
                placeholder="Totals"
                disabled
                className="bolder"
              />
            </td>
            <td td style={{ paddingLeft: "6%" }}>
              <input
                type="text"
                placeholder={`$${properties
                  .reduce((acc, property) => acc + property.currentValue, 0)
                  .toFixed(2)}`}
                disabled
                className="bolder"
              />
            </td>
            <td td style={{ paddingLeft: "6%" }}>
              <input
                type="text"
                placeholder={`$${properties
                  .reduce((acc, property) => acc + property.currentLoan, 0)
                  .toFixed(2)}`}
                disabled
                className="bolder"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder={`$${calculateEquityValue()}`}
                disabled
                className="bolder"
              />
            </td>
            <td td style={{ paddingLeft: "-1%" }}>
              <input
                type="text"
                placeholder={`$${calculateLVR()}`}
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

export default Assets;
