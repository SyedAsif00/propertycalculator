import React, { createContext, useState, useContext } from "react";
import Section_1 from "./sections2/Section_1";
import Section_2 from "./sections2/Section_2";
import Section_3 from "./sections2/Section_3";
import "./Form2.css";
import "./section.css";
import "./index.css";
import Sidebar from "../sidebar";
import Header from "../header/index";

// Create a context
export const DataContext = createContext();

// A component that provides the data context
const DataProvider = ({ children, onData }) => {
  const [data, setData] = useState({});

  // Function to update the data and notify the parent component
  const updateData = (key, newData) => {
    setData((prevData) => {
      const updatedData = {
        ...prevData,
        [key]: { ...prevData[key], ...newData },
      };
      onData(updatedData); // Notify parent component
      return updatedData;
    });
    console.log(data);
  };

  // Pass the data and updateData function through the context
  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

// App component
export default function Form2() {
  // This function will be called whenever the data changes
  const handleData = (data) => {
    console.log("App data:", data);
  };

  return (
    <div className="mainDashboard">
      <Sidebar />
      <div className="homeContainer">
        <Header />
        <DataProvider onData={handleData}>
          <div className="section_container">
            <Section_1 />
            <Section_2 />
            <Section_3 />
          </div>
        </DataProvider>
      </div>
    </div>
  );
}
