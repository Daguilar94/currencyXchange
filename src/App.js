import React, { useState } from 'react';

import { currencies } from './utils/constants';

import './App.scss';

import Header from './components/header';
import Quote from './containers/quote/';
import History from './containers/history/';
import Footer from './components/footer';

function App() {
  const [sourceCurrency] = useState(currencies.EUR);
  const [targetCurrency] = useState(currencies.USD);

  return (
    <div className="money-exchange">
      <Header />
      <Quote sourceCurrency={sourceCurrency} targetCurrency={targetCurrency} />
      <History sourceCurrency={sourceCurrency}/>
      <Footer />
    </div>
  );
}

export default App;
