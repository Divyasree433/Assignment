import DataContext from "./data-context";
import React,{useContext,useReducer}from 'react'
const defaultitems={
    items:[]
}
const itemreducer=(state,action)=>{
    let  updatedItems;
    if(action.type==="ADD")
    {
        updatedItems=state.items.concat(action.item);
    }
    return {
        items:updatedItems
    }
}
function DataProvider(props) {
    const [itemsstate,dispatch]=useReducer(itemreducer,defaultitems)
    const addItemHandler=item=>{
        dispatch({type:"ADD",item:item});
    }
    const itemcontext={
        items:itemsstate.items,
        addItem:addItemHandler
    }
    return (
        <DataContext.Provider value={itemcontext}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider