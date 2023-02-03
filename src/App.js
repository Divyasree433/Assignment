import React,{useState}from 'react'
import {Data} from './Components/Data'
import * as XLSX from 'xlsx'

function aggregateInventoryRecords(records) {
  const result = [];
  const groupedRecords = records.reduce((acc, record) => {
      const { name } = record;
      if (!acc[name]) {
          acc[name] = [];
      }
      acc[name].push(record);
      return acc;
  }, {});
  for (const name in groupedRecords) {
      const batches = groupedRecords[name];
      const stock = batches.reduce((acc, batch) => acc + batch.stock, 0);
      const deal = Math.min(...batches.map(batch => batch.deal));
      const free = Math.min(...batches.map(batch => batch.free));
      const mrp = Math.max(...batches.map(batch => batch.mrp));
      const rate = Math.max(...batches.map(batch => batch.rate));
      const expiryDates = batches.map(batch => new Date(batch.exp));
      const nearestExpiry = expiryDates.reduce((prev, curr) => {
          return (prev - new Date() < curr - new Date()) ? prev : curr;
      });
      result.push({ name, "batch": "All", stock, deal, free, mrp, rate, exp: nearestExpiry.toLocaleDateString() });
  }
  return result;
}
function App() {
  const [exceldatarecieved, setExcelData]=useState(null);  
  const readExcel=(file)=>{
           const fileReader=new FileReader();
           fileReader.readAsArrayBuffer(file);
           fileReader.onload=(e)=>{
           const bufferArry=e.target.result;
           const wb=XLSX.read(bufferArry,{type:"buffer"})
           const wsname = wb.SheetNames[0];
           const ws = wb.Sheets[wsname];
           const data = XLSX.utils.sheet_to_json(ws);
           const x=aggregateInventoryRecords(data);
           setExcelData(x);
        }
  }
  return (
    <div className="container">

      {/* upload file section */}
      <div className='form'>
        <form className='form-group' autoComplete="off">
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' className='form-control' required onChange={(e)=>{
            const file=e.target.files[0];
            readExcel(file)}}></input>                  
          <button type='submit' className='btn btn-success'
          style={{marginTop:5+'px'}}>Submit</button>
        </form>
      </div>

      <br></br>
      <hr></hr>

      {/* view file section */}
      <h5>View Excel file</h5>
      <div className='viewer'>
        {exceldatarecieved===null&&<>No file selected</>}
        {exceldatarecieved!==null&&(
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Name</th>
                  <th scope='col'>Batch</th>
                  <th scope='col'>Stock</th>
                  <th scope='col'>Deal</th>
                  <th scope='col'>Free</th>
                  <th scope='col'>Mrp</th>
                  <th scope='col'>Rate</th>
                  <th scope='col'>Expiry</th>            
                </tr>
              </thead>
              <tbody>
                <Data excelData={exceldatarecieved}/>
              </tbody>
            </table>            
          </div>
        )}       
      </div>
    </div>
  )
}

export default App;