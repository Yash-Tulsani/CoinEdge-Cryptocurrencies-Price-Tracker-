import { ThemeProvider,createTheme } from '@mui/material/styles';
import { Pagination, TextField } from '@mui/material'
import React, { useState,useEffect } from 'react'
import { CoinList } from '../Config/api'
import { CurrencyState } from '../Context/CurrenyContext'
import CoinsTable from './CoinsTable'


export default function CoinsTableContainer() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const {currency}=CurrencyState();

  const fetchCoins=async ()=>{
    setLoading(true);
    const url=CoinList(currency);
    const response=await fetch(url);
    const data=await response.json();
    setCoins(data);
    setLoading(false)
  }

  useEffect(() => {
    return () => {
      fetchCoins();
    }
  }, [])

  useEffect(() => {
    return () => {
      fetchCoins();
    }
  }, [currency])
  
  const theme = createTheme({
    palette: {
      mode:'dark'
    }
  });

  const handleSearch=()=>{
      return coins.filter(coin=>{
        return (coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase()));
      }) 
  }

  return (
    <ThemeProvider theme={theme}>
      <div id="coinsTableContainer">
        <span id="coinsTableHead">Cryptocurrencies By Market Price</span>
        <TextField id="coinsTableSearch" label="Search For Cryptocurrencies..." variant='outlined' sx={{width:"100%"}}
          value={search} onChange={(e)=>setSearch(e.target.value)}></TextField>
        <CoinsTable loading={loading} coinsList={handleSearch()} page={page}></CoinsTable>
        <Pagination count={(handleSearch()?.length/10).toFixed()}
          sx={{width:"100%",display:"flex",justifyContent:"center"}}
          size="large"
          onChange={(_,value)=>{
            setPage(value);
            window.scroll(0,450);
          }}></Pagination>  
      </div>
    </ThemeProvider>
  )
}
