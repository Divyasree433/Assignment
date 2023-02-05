import { useState } from 'react'
import Singlerow from './Singlerow';
export default function Home(){
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const processCSV = (str, delim=',') => {
        const headers = str.slice(0,str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n')+1).split('\n');
        const newArray = rows.map( row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })
        setCsvArray(newArray)
    }

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            processCSV(text)
        }

        reader.readAsText(file);
    }
    return(
        <>
        {/* <div>
            <InventoryChart data={csvArray}/>
        </div> */}
        <form id='csv-form'>
            <input
                className='form-control'
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                }}
            >
            </input>
            <br/>
            <button
              className='btn btn-success'
                onClick={(e) => {
                    e.preventDefault()
                    if(csvFile)
                    submit()
                }}
            >
                Submit
            </button>
            <br/>
            <br/>
            {csvArray.length>0?
            <Singlerow csvArray={csvArray}/>:<p className='text-center bg-secondary text-white'>
                No file selected</p>}
        </form>
        </>
    );

}