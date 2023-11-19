// export default function formatNumberWithCommas(number) {
//     if (isNaN(number)) {
//       return 'Invalid Number';
//     }

//     const parts = number.toString().split('.');

//     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

//     return parts.join('.');
//   }

// utils.js
const formatNumberWithCommas = (number) => {
  if (number === null || isNaN(number)) {
    return "0.00";
  }
  return parseFloat(number).toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default formatNumberWithCommas;
