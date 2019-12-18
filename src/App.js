import React from 'react';
import Header from './components/header';
import Quote from './components/quote/';
import History from './components/history/';
import Footer from './components/footer';
import './App.css';
import axios from 'axios';

axios.defaults.params = {}
axios.defaults.params['access_key'] = '31ab9c10883dbeebcc701af076baad09';

function App() {
  return (
    <div className="App">
      <Header />
      <Quote />
      <History />
      <Footer />
    </div>
  );
}

export default App;
