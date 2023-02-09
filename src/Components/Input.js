import { useEffect, useState } from 'react'
import Pagination from './SearchBy';
import '../CSSfiles/Input.css'
export default function Home(){
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const [productGroups, setProductGroups] = useState({});
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
    const parseCSV = (csvArray) => {
        let groupedProducts = {};
        for (let i = 0; i < csvArray.length; i++) {
          let productName = csvArray[i].name;
          if (!groupedProducts[productName]) {
            groupedProducts[productName] = [];
          }
          groupedProducts[productName].push(csvArray[i]);
        }
        setProductGroups(groupedProducts);
    }
    useEffect(()=>{
        parseCSV(csvArray);
    },[csvArray])
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
        <div className='upload-heading'>Upload a file</div>
        <form>
            <input
                className='form-control input-container'
                type='file'
                accept='.csv'
                id='excel-file'
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
            <Pagination productGroups={productGroups}/>:<p className='text-center bg-secondary text-white'>
                No file selected</p>}
        </form>
        </>
    );

}