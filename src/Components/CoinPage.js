import { LinearProgress } from '@mui/material';
import HTMLReactParser from 'html-react-parser';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Config/api';
import { CurrencyState, SymbolState } from '../Context/CurrenyContext'
import CoinChart from './CoinChart';

export default function CoinPage() {
  const {id}=useParams()
  const {currency}=CurrencyState();
  const {symbol}=SymbolState();

  const [coin, setCoin] = useState(null)

  const fetchCoin=async ()=>{
    console.log(id)
    const url=SingleCoin(id);
    const response=await fetch(url);
    const data=await response.json();
    setCoin(data);
    console.log(data);
  }

  useEffect(() => {
    return () => {
      fetchCoin();
    }
  }, [])

  function displayMarketCap(market_cap){
    return symbol+Math.round((market_cap/1000000)).toLocaleString()+"M";
  }
  function displayCurrentPrice(current_price){
    return symbol+Math.round((current_price)).toLocaleString();
  }
  
  if(!coin) return (<LinearProgress sx={{backgroundColor:"gold"}}></LinearProgress>)
  return (
   
    <div id="coinPageContainer">
      <div id="coinDescriptionSidebar">
        <img src={coin?.image?.large}  id="sidebarImg" alt={coin?.name} />
        <div id="sidebarName">{coin?.name}</div>
        <div id="sidebarDescription">{HTMLReactParser(String(coin?.description?.en.split('. ')[0]))}</div>
        <div id="sidebarInfoContainer">
          <span className="sidebarInfo"><span className="sidebarInfoHead">Rank:</span>{coin?.market_cap_rank}</span>
          <span className="sidebarInfo"><span className="sidebarInfoHead">Current Price:</span>{displayCurrentPrice(coin?.market_data?.current_price[currency.toLowerCase()])}</span>
          <span className="sidebarInfo"><span className="sidebarInfoHead">Market Cap:</span>{displayMarketCap(coin?.market_data?.market_cap[currency.toLowerCase()])}</span>
        </div>
      </div>
      <CoinChart coin={coin}/>
    </div>
  )
}
