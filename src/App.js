import React, { useState, useEffect } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrensy, setFromCurrensy] = useState( "USD");
  const [toCurrensy, setToCurrensy] = useState("CZK");
  const [fromPrice, setFromPrice] = useState(1);
  const [toPrice, setToPrice] = useState(0);

  // const [rates, setRates] = useState({})

  const ratesRef = React.useRef({})
  
  useEffect(() => {
    fetch('https://cdn.cur.su/api/nbu.json')
      .then(res => res.json())
      .then((json) => {
        ratesRef.current = json.rates;
        onChangeFromPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert('not found information) ')
      })
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrensy];
    const result = price * ratesRef.current[toCurrensy];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrensy] / ratesRef.current[toCurrensy]) * value;
    setFromPrice(result.toFixed(3))
    setToPrice(value);
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrensy]);
  
  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrensy]);


  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrensy} onChangeCurrency={setFromCurrensy} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrensy} onChangeCurrency={setToCurrensy}  onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
