
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './Components/Header';
import HomePage from './Components/HomePage';
import CoinPage from './Components/CoinPage';
import CurrenyContext from './Context/CurrenyContext';



function App() {

 

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>} exact/>
          <Route path="/coins/:id" element={<CoinPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
