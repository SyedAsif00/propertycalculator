import React, { useRef, useState } from 'react';

const DocumentUpload = () => {
  // State to store uploaded files
  const [files, setFiles] = useState({
    contractOfSaleRatesNotices: null,
    incomeDocs: null,
    factFindOtherLendersApp: null,
    currentLoanStatements: null,
    fileDump: null,
  });

  // References to the hidden file inputs
  const fileInputRefs = {
    contractOfSaleRatesNotices: useRef(null),
    incomeDocs: useRef(null),
    factFindOtherLendersApp: useRef(null),
    currentLoanStatements: useRef(null),
    fileDump: useRef(null),
  };

  // Handles file selection
  const handleFileChange = (name) => (event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles(prevFiles => ({
        ...prevFiles,
        [name]: file,
      }));
    }
  };

  // Function to trigger the file input
  const triggerFileInput = (name) => {
    fileInputRefs[name].current.click();
  };

  // Function to download the file
  const downloadFile = (file) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Function to create a human-readable label from the file state key
  const formatLabel = (str) => {
    return str
      // Split based on uppercase letters
      .split(/(?=[A-Z])/)
      // Capitalize the first letter of each word and join with spaces
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div>
      <h4>Document Upload</h4>
      
      {/* Links to trigger file upload */}
      {Object.keys(files).map((name) => (
        <React.Fragment key={name}>
          <p onClick={() => triggerFileInput(name)}>
            {formatLabel(name)}
            {files[name] && (
              <>
                <span>: </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the file input from being triggered
                    downloadFile(files[name]);
                  }}
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                  {files[name].name}
                </span>
              </>
            )}
          </p>
          <input
            type="file"
            name={name}
            ref={fileInputRefs[name]}
            onChange={handleFileChange(name)}
            style={{ display: 'none' }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default DocumentUpload;
