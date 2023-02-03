import React from 'react'
const Singlerow=(datarecieved)=> {
//    console.log(typeof(datarecieved.individualexceldata));
   
  return (
    <>
        <th>{datarecieved.individualexceldata.name}</th>
        <th>{datarecieved.individualexceldata.batch}</th>
        <th>{datarecieved.individualexceldata.stock}</th>
        <th>{datarecieved.individualexceldata.deal}</th>
        <th>{datarecieved.individualexceldata.free}</th>
        <th>{datarecieved.individualexceldata.mrp}</th>
        <th>{datarecieved.individualexceldata.rate}</th>
        <th>{datarecieved.individualexceldata.exp}</th>   
    </>
  )
}

export default Singlerow;
