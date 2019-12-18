import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/header';
import Quote from './containers/quote/';
import History from './containers/history/';
import Footer from './components/footer';
import './App.css';
import { currencies } from './constants';

axios.defaults.params = {}
axios.defaults.params['access_key'] = '31ab9c10883dbeebcc701af076baad09';

function App() {
  const [sourceCurrency] = useState(currencies.EUR);
  const [targetCurrency] = useState(currencies.USD);

  return (
    <div className="App">
      <Header />
      <Quote sourceCurrency={sourceCurrency} targetCurrency={targetCurrency} />
      <History sourceCurrency={sourceCurrency}/>
      <Footer />
    </div>
  );
}

export default App;
