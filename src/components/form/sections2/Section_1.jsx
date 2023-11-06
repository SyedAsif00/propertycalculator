import React from 'react'
import Borrower from './Borrower'
import LoanBreakdown from './LoanBreakdown'
import './section1.css'
import Security from './Security'
const Section_1 = (props) => {
  // console.log('Section_1 onData:', props.onData);
  return (
    <div>
      <Borrower onData={props.onData}/>
      <Security onData={props.onData}/>
      <LoanBreakdown />
    </div>
  )
}

export default Section_1