import React, { useState } from "react";
import _ from "lodash";

const EachRow = (props) => {
  const productBatches = props.item[1];
  const batchesList = ["All"];
  const [selectedBatch, setSelectedBatch] = useState("All");

  for (const temp of productBatches) {
    if (!batchesList.includes(temp["batch"])) {
      batchesList.push(temp["batch"]);
    }
  }
  const dropdownHandler = (event) => {
    setSelectedBatch(event.target.value);
  };

  var requiredFreeByDeal = 100;
  var free = 0;
  var deal = 0;
  for (const prodBatch of productBatches) {
    if (prodBatch["free"] / prodBatch["deal"] < requiredFreeByDeal) {
      requiredFreeByDeal = prodBatch["free"] / prodBatch["deal"];
      free = prodBatch["free"];
      deal = prodBatch["deal"];
    }
  }

  if (selectedBatch === "All") {
    return (
      <tr>
        <td>{props.item[0]}</td>
        <td>
          <select
            className="btn btn-secondary dropdown-toggle"
            onChange={dropdownHandler}
            value="All"
          >
            {batchesList.map((batchId) => (
              <option key={Math.random().toString()}>{batchId}</option>
            ))}
          </select>
        </td>
        <td>{_.sumBy(productBatches,function(o) { return +(o.stock); })}</td>
        <td>{deal}</td>
        <td>{free}</td>
        <td>{_.maxBy(productBatches, "mrp").mrp}</td>
        <td>{_.maxBy(productBatches, "rate").rate}</td>
        <td>{_.minBy(productBatches, "exp").exp}</td>
      </tr>
    );
  } else {
    const requiredRow = productBatches.filter((product) => {
      return product.batch === selectedBatch;
    });
    return (
      <tr>
        <td className="name">{props.item[0]}</td>
        <td className="batches">
          <select
            className="btn btn-secondary dropdown-toggle"
            onChange={dropdownHandler}
            value={selectedBatch}
          >
            {batchesList.map((batchId) => (
              <option key={Math.random().toString()}>{batchId}</option>
            ))}
          </select>
        </td>
        <td >{_.sumBy(requiredRow, "stock")}</td>
        <td >{_.sumBy(requiredRow, "deal")}</td>
        <td >{_.sumBy(requiredRow, "free")}</td>
        <td >{_.maxBy(requiredRow, "mrp").mrp}</td>
        <td >{_.maxBy(requiredRow, "rate").rate}</td>
        <td >{_.minBy(requiredRow, "exp").exp}</td>
      </tr>
    );
  }
};

export default EachRow;