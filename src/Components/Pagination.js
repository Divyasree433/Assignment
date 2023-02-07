import React, { useState } from "react";
import InventoryChart from "./InventoryChart";
const Pagination = ({aggreagtedarray}) => 
{
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(100);
  let isvalid=false;
  //used to get current data
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  if(aggreagtedarray.length>0)
  isvalid=true;
  const currentData = aggreagtedarray.slice(indexOfFirstData, indexOfLastData);
  // changing the page number
  const paginate = pageNumber => setCurrentPage(pageNumber);
  //Adding no of pagenumber may be present
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(aggreagtedarray.length / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  return (   
    <div className="table-responsive">
      {/*displaying table of aggreagtedarray*/}
      {isvalid ?
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Stock</th>
            <th>Deal</th>
            <th>Free</th>
            <th>MRP</th>
            <th>Rate</th>
            <th>Exp</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(item => (
            <tr>
              <td>{item.name}</td>
              <td>{item.batch}</td>
              <td>{item.stock}</td>
              <td>{item.deal}</td>
              <td>{item.free}</td>
              <td>{item.mrp}</td>
              <td>{item.rate}</td>
              <td>{item.exp}</td>
            </tr>
          ))
         } 
        </tbody>
        </table>
        :<h2 className="text-danger text-center">No data found</h2>}
        <nav>
        <ul className="pagination">
          {
          pageNumbers.map(number => (
            <li key={number} className={number === currentPage ? "page-item active" : "page-item"}>
                <a href="#!" onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          ))
          }
        </ul>
        </nav>
        {isvalid && <InventoryChart arr={aggreagtedarray}/>} 
      </div>
     );
};

export default Pagination;
