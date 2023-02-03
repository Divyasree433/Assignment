import React from "react"
const DataContext=React.createContext({
    items:[],
    addItem:(item)=>{}
});
export default DataContext;