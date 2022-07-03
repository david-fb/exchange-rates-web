import { useState } from 'react';
import dayjs from 'dayjs';

let initialState = {
  date: dayjs(),
  fromCurrency: 'USD',
  unitFromValue: 4000,
  fromValue: 1,
  toCurrency: 'ARS',
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

  const setFromValue = (value) => {
    setState((state) => {
      return { ...state, fromValue: value };
    });
  };

  const setToValue = (value) => {
    setState((state) => {
      return { ...state, toValue: value };
    });
  };

  const getConversion = (value, origin) => {
    let result = 0;
    result = value * 4000;
    setState((state) => {
      return { ...state, toValue: origin === 'toValue' ? value : result, fromValue: origin === 'fromValue' ? value : result };
    });
  };

  const setCurrencies = (currencies) => {
    setState({ ...state, currencies: currencies });
  };

  return { state, setFromCurrency, setToCurrency, setDate, setFromValue, setToValue, getConversion, setCurrencies };
};

export default useInitialState;
