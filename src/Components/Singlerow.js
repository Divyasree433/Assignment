import React from 'react'
import Pagination from './Pagination';
const Singlerow=({csvArray})=> {
  function aggregatedata(arr){
    let result = [];
  let uniqueNames = Array.from(new Set(arr.map(item => item.name)));
  uniqueNames.forEach(name => {
    let obj = {
      name: name,
      batch: "All",
      stock: 0,
      deal: 0,
      free: 0,
      mrp: 0,
      rate: 0,
      exp: ""
    };
    arr.forEach(item => {
        if (item.name === name) {
          obj.stock += parseInt(item.stock);
          obj.deal += parseInt(item.deal);
          obj.free += parseInt(item.free);
          obj.mrp = item.mrp;
          obj.rate = item.rate;
          if (obj.exp === "") obj.exp = item.exp;
          else obj.exp = new Date(obj.exp) < new Date(item.exp) ? obj.exp : item.exp;
        }
      });
      result.push(obj);
    });
    return result;
}
  let a=aggregatedata(csvArray);
  return (
    <>
    <Pagination aggreagtedarray={a}/>
    </>
    
  )
}

export default Singlerow;
