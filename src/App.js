import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import CoinPage from './Pages/CoinPage';
import HomePage from './Pages/HomePage';


function App() {


  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/coin/:id' element={<CoinPage/>} />
      </Routes>
    </div>
  );
}

export default App;
