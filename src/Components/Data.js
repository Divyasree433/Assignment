import React from 'react'
import Singlerow from './Singlerow'


export const Data = ({excelData}) => {
    
    return excelData.map((individualexceldata)=>(
        <tr>
            <Singlerow individualexceldata={individualexceldata}/>
        </tr>        
    ))
}
