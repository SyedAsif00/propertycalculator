import React, { useEffect, useState } from "react";
import formatNumberWithCommas from "./utils";
import PurchaseCosts from "./purchasecosts";
import "./loanbreakdown.css";
import RefinanceCosts from "./refinancecosts";
import SettlementCosts from "./settlements";

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

const LoanBreakdown = ({ firstMortgage = null }) => {
  const [data, setData] = useState({
    sources: { firstMortgage: firstMortgage, vendor: null, borrower: null },
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
  const total = Object.values(data.sources).reduce(
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
          {Object.keys(data.sources).map((key) => (
            <tr key={key}>
              <td style={{ fontWeight: "400" }}>{labels[key]}</td>
              <td style={{ textAlign: "right" }}>
                <input
                  placeholder={placeholders[key]}
                  type="text"
                  value={data.sources[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot style={{ borderTop: "1px solid black" }}>
          <tr>
            <td style={{ fontWeight: "bold" }}>Total</td>
            <td style={{ fontWeight: "bold", width: "40px" }}>
              <input
                value={"$" + formatNumberWithCommas(total)}
                style={{ fontWeight: 800 }}
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
      <PurchaseCosts/>
      <RefinanceCosts/>
      <SettlementCosts/>
    </div>
  );
}
