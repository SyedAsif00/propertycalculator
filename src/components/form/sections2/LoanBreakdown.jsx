import React, { useContext, useEffect, useState } from "react";
import formatNumberWithCommas from "./utils";
import PurchaseCosts from "./purchasecosts";
import "./loanbreakdown.css";
import RefinanceCosts from "./refinancecosts";
import SettlementCosts from "./settlements";
import { DataContext } from "../Form2";

const labels = {
  firstMortgage: "First Mortgage Loan Advance",
  vendor: "Vendor/Second Mortgage Loan Advance",
  borrower: "Borrower Cash Contribution",
};

const placeholders = {
  firstMortgage: "$0",
  vendor: "$0",
  borrower: "$0",
};

const LoanBreakdown = () => {
  const {
    data: { firstMortgage = null },
  } = useContext(DataContext);
  console.log(firstMortgage);
  const [data, setData] = useState({
    sources: { vendor: null, borrower: null },
  });

  // Generic update function to handle input changes
  const handleInputChange = (key, newValue) => {
    setData((prevData) => ({
      sources: {
        ...prevData.sources,
        [key]: newValue,
      },
    }));
  };

  // Calculate the total
  const total =
    firstMortgage +
    Object.values(data.sources).reduce(
      (acc, value) => acc + parseFloat(value ? value : 0),
      0
    );

  const [childTotals, setChildTotals] = useState({
    purchaseCosts: 0,
    refinanceCosts: 0,
    settlementCosts: 0,
  });

  // Function to update the totals from child components
  const updateChildTotals = (child, total) => {
    setChildTotals((prevTotals) => ({
      ...prevTotals,
      [child]: total,
    }));
  };

  const finaltotal =
    childTotals.purchaseCosts +
    childTotals.refinanceCosts +
    childTotals.settlementCosts +
    Object.values(data.sources).reduce(
      (acc, value) => acc + parseFloat(value ? value : 0),
      0
    );

  return (
    <div>
      <h4>Requested Loan Breakdown</h4>
      <table className="borrower_head">
        <thead>
          <tr>
            <th>Sources of Money</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr key={"firstMortgage"}>
            <td style={{ fontWeight: "400" }}>{labels["firstMortgage"]}</td>
            <td style={{ textAlign: "right", transform: "translateX(-25px)" }}>
              <input
                placeholder={placeholders["firstMortgage"]}
                type="text"
                value={"$" + firstMortgage}
                disabled
              />
            </td>
          </tr>
          {Object.keys(data.sources).map((key) => (
            <tr key={key}>
              <td style={{ fontWeight: "400" }}>{labels[key]}</td>
              <td
                style={{ textAlign: "right", transform: "translateX(-25px)" }}
              >
                <input
                  placeholder={placeholders[key]}
                  type="text"
                  value={`$${data.sources[key] ?? 0}`}
                  onChange={(e) => {
                    handleInputChange(
                      key,
                      parseFloat(e.target.value?.replace("$", "")) || 0
                    );
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot style={{ borderTop: "1px solid black" }}>
          <tr>
            <td>
              <input value={"Total"} disabled></input>
            </td>
            <td
              style={{ width: "40px", transform: "translateX(-25px)" }}
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

export default function Breakdown() {
  return (
    <div>
      <LoanBreakdown />
      <PurchaseCosts />
      <RefinanceCosts />
      <SettlementCosts />
    </div>
  );
}
