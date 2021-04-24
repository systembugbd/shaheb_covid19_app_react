import React from "react";
import numeral from "numeral";

function Table({ counteryData }) {
 

  return (
    <div className="table">
       <tr>
        <td><b>#</b></td>
        <td><b>Country</b></td>
        <td><b>Cases</b></td>
      </tr>

       

      {counteryData.map(({country, cases }, index) => (
        
         
        <tr>
          <td>{index+1}</td>
          <td>{country}</td>
          <td><b>{numeral(cases).format('0,0')}</b></td>
        </tr>

        
      ))}
    </div>
  );
}

export default Table;
