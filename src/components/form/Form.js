import React, { useState } from "react";
import "./form.css";
import "./index.css";
import Sidebar from "../sidebar/index";
import { Button, Divider } from "antd";
import { businessButton } from "../../styles/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import BorrowerDetails from "./sections/BorrowerDetails";
import SecurityDetails from "./sections/SecurityDetails";
import AssetsLiabilities from "./sections/AssetsLiabilities";
import ExpectedIssues from "./sections/ExpectedIssues";
import RequestedLoanTerms from "./sections/RequestedLoanTerms";
import RequestedLoanBreakdown from "./sections/RequestedLoanBreakdown";

const Form = () => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate("/dashboard");
  };

  const [formData, setFormData] = useState({
    borrowerDetails: undefined,
    securityDetails: {},
    assetsLiabilities: {},
    expectedIssues: {},
    requestedLoanTerms: {},
    requestedLoanBreakdown: {
      status: ["Positive", "Positive", "Positive", "Positive"],
      values: ["$1,202,500", "$0", "$0", "$1,202,500"],
    },
    currentStep: 0,
  });

  const steps = [
    {
      title: "Borrower Details",
      content: (
        <BorrowerDetails
          data={formData.borrowerDetails}
          setData={(data) =>
            setFormData({ ...formData, borrowerDetails: data })
          }
          onEdit={() => setFormData({ ...formData, currentStep: 0 })}
        />
      ),
    },
    {
      title: "Security Details",
      content: (
        <SecurityDetails
          data={formData.securityDetails}
          setData={(data) =>
            setFormData({ ...formData, securityDetails: data })
          }
          onEdit={() => setFormData({ ...formData, currentStep: 2 })}
        />
      ),
    },
    {
      title: "Requested Loan Breakdown",
      content: (
        <RequestedLoanBreakdown
          status={formData.requestedLoanBreakdown.status}
          values={formData.requestedLoanBreakdown.values}
          onEdit={() => setFormData({ ...formData, currentStep: 1 })}
        />
      ),
    },
    {
      title: "Assets & Liabilities",
      content: (
        <AssetsLiabilities
          data={formData.assetsLiabilities}
          setData={(data) =>
            setFormData({ ...formData, assetsLiabilities: data })
          }
          onEdit={() => setFormData({ ...formData, currentStep: 3 })}
        />
      ),
    },
    {
      title: "Requested Loan Terms",
      content: (
        <RequestedLoanTerms
          data={formData.requestedLoanTerms}
          setData={(data) =>
            setFormData({ ...formData, requestedLoanTerms: data })
          }
          onEdit={() => setFormData({ ...formData, currentStep: 4 })}
        />
      ),
    },
    {
      title: "Expected Issues",
      content: (
        <ExpectedIssues
          data={formData.expectedIssues}
          setData={(data) => setFormData({ ...formData, expectedIssues: data })}
          onEdit={() => setFormData({ ...formData, currentStep: 5 })}
        />
      ),
    },
  ];

  const next = () => {
    setFormData({ ...formData, currentStep: formData.currentStep + 1 });
  };

  const prev = () => {
    setFormData({ ...formData, currentStep: formData.currentStep - 1 });
  };

  return (
    <div className="mainDashboard">
      <Sidebar />
      <div className="homeContainer">
        <Button
          style={{ ...businessButton, width: "200px" }}
          onClick={handleNav}
        >
          <ArrowLeftOutlined />
          Go Back
        </Button>

        <Divider />

        <div className="steps-content">
          <div className="left-side">
            {steps[0].content}
            {steps[1].content}
            {steps[2].content}
          </div>
          <div className="right-side">
            {steps[3].content}
            {steps[4].content}
            {steps[5].content}
          </div>
        </div>
        <Divider />

        <div
          className="steps-action"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
            width: 400,
          }}
        >
          {formData.currentStep > 0 && (
            <Button style={{ marginRight: "8px" }} onClick={prev}>
              Previous
            </Button>
          )}
          {formData.currentStep < steps.length - 1 && (
            <Button
              type="primary"
              onClick={next}
              style={{ backgroundColor: "#6439FF", borderColor: "#6439FF" }}
            >
              Next
            </Button>
          )}
          {formData.currentStep === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => navigate("/dashboard")}
              style={{ backgroundColor: "#6439FF", borderColor: "#6439FF" }}
            >
              Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
