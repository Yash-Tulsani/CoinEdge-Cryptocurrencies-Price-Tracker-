
import { MenuItem, Select } from '@mui/material'
import { ThemeProvider,createTheme } from '@mui/material/styles';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css"
import { CurrencyState,SymbolState} from '../Context/CurrenyContext';

function Header() {
  const navigate= useNavigate();

  function titleClickHandler(e){
    navigate('/')
  }
    const theme = createTheme({
      palette: {
        mode:'dark'
      }
    });

    const {currency,setCurrency}=CurrencyState();
    const {symbol,setSymbol}=SymbolState();
  
  return (
    <ThemeProvider theme={theme}>
        <nav id="header">
            <span className="appTitle" onClick={titleClickHandler}>Coin Edge</span>
            <div id="headerCorner">
              <Select variant="outlined" id="currencySelect" value={currency} onChange={(e)=>{
                if(e.target.value=='INR'){
                  setSymbol("$")
                }
                else if(e.target.value=='USD'){
                  setSymbol("Re")
                }
                setCurrency(e.target.value)}}>
                  <MenuItem className="currencyItem" value={'INR'}>INR</MenuItem>
                  <MenuItem className="currencyItem" value={'USD'}>USD</MenuItem>
              </Select>
            </div>
            
        </nav>
    </ThemeProvider>
  )
}

export default Header