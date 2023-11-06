import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../Form2";

const ExpectedIssues = ({ initialData }) => {
  const { updateData } = useContext(DataContext);
  const defaultData = [
    {
      issue: "Credit History",
      isChecked: false,
      comment: "",
    },
    {
      issue: "Loan Repayment History",
      isChecked: false,
      comment: "",
    },
    {
      issue: "LVR",
      isChecked: false,
      comment: "",
    },
    {
      issue: "Rate Expectations",
      isChecked: false,
      comment: "",
    },
  ];

  const [formData, setFormData] = useState(initialData || defaultData);

  const handleCheckboxChange = (index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].isChecked = !updatedFormData[index].isChecked;
    setFormData(updatedFormData);
    updateData("issues",updatedFormData);
  };

  const handleCommentChange = (index, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index].comment = value;
    setFormData(updatedFormData);
    updateData("issues",updatedFormData);
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  return (
    <div>
      <h4>Expected Issues to overcome</h4>
      <table className="borrower_head">
        <tbody className="borrower_body">
          {formData.map((item, index) => (
            <tr key={index}>
              <td>
                <input type="text" placeholder={item.issue} disabled />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => handleCheckboxChange(index)}
                  className="redify"
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Optional Comment"
                  value={item.comment}
                  onChange={(e) => handleCommentChange(index, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpectedIssues;
