import React, { createContext, useContext } from 'react'
import { useState,useEffect } from 'react';
export const Currency= createContext();


function CurrencyContext(props) {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹")

    
    
  return (
    <Currency.Provider value={{currency,setCurrency,symbol,setSymbol}}>
        {props.children}
    </Currency.Provider>    

  )
}

export default CurrencyContext
export const CurrencyState=()=>{
    return useContext(Currency)
};

export const SymbolState=()=>{
    return useContext(Currency)
}
