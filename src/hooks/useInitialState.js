import { useState } from 'react';
import dayjs from 'dayjs';

let initialState = {
  date: dayjs(),
  fromCurrency: '',
  unitFromValue: 4000,
  fromValue: 1,
  toCurrency: '',
  unitToValue: 0.00024,
  toValue: 1,
  currencies: {},
};

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const setFromCurrency = (currency) => {
    setState({ ...state, fromCurrency: currency });
  };

  const setToCurrency = (currency) => {
    setState({ ...state, toCurrency: currency });
  };

  const setDate = (date) => {
    setState({ ...state, date: date });
  };

  const getConversion = (value, origin) => {
    if (isNaN(Number(value)) || value === '' || value == null) return;
    let result = 0;
    result = origin === 'fromValue' ? value * 4000 : value / 4000;
    setState({ ...state, toValue: origin === 'toValue' ? value : result, fromValue: origin === 'fromValue' ? value : result });
  };

  const setCurrencies = (currencies) => {
    setState({ ...state, currencies: currencies });
  };

  const setInitialQuery = (payload) => {
    setTimeout(() => {
      const result = payload.amount * 4000;
      setState({ ...state, fromCurrency: payload.from, toCurrency: payload.to, fromValue: payload.amount, toValue: result });
    }, 500);
  };

  return { state, setFromCurrency, setToCurrency, setDate, getConversion, setCurrencies, setInitialQuery };
};

export default useInitialState;
