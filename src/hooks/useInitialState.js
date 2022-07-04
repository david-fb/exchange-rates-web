import { useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

let initialState = {
  date: dayjs(),
  fromCurrency: '',
  unitFromValue: 1,
  fromValue: 1,
  toCurrency: '',
  unitToValue: 1,
  toValue: 1,
  currencies: {},
  lastUpdate: '',
  unitFromHistorical: 1,
  unitToHistorical: 1,
};

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const setFromCurrency = (currency) => {
    setState({ ...state, fromCurrency: currency });
  };

  const setToCurrency = (currency) => {
    setState({ ...state, toCurrency: currency });
  };

  const setDate = async (date) => {
    if (date.isSame(dayjs(), 'day')) {
      return setState((state) => {
        return { ...state, date: date, unitFromHistorical: state.unitFromValue, unitToHistorical: state.unitToValue };
      });
    }
    const res = await fetch('/api/historical', {
      method: 'POST',
      body: JSON.stringify({ date: date.format('YYYY-MM-DD'), symbol1: state.fromCurrency, symbol2: state.toCurrency }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { unitTo, unitFrom } = await res.json();
    setState((state) => {
      return { ...state, date: date, unitFromHistorical: unitFrom, unitToHistorical: unitTo };
    });
  };

  const getConversion = async (value, origin) => {
    if (isNaN(Number(value)) || value === '' || value == null) return;

    const res = await fetch('/api/convert', {
      method: 'POST',
      body: JSON.stringify({ amount: value, from: origin === 'fromValue' ? state.fromCurrency : state.toCurrency, to: origin === 'fromValue' ? state.toCurrency : state.fromCurrency }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { result, unitTo, unitFrom, timestamp } = await res.json();

    setState({
      ...state,
      toValue: origin === 'toValue' ? value : result,
      fromValue: origin === 'fromValue' ? value : result,
      unitToValue: origin === 'toValue' ? unitTo : unitFrom,
      unitFromValue: origin === 'fromValue' ? unitFrom : unitTo,
      lastUpdate: timestamp,
    });
  };

  const setCurrencies = (currencies) => {
    setState({ ...state, currencies: currencies });
  };

  const setInitialQuery = async (payload) => {
    const res = await fetch('/api/convert', {
      method: 'POST',
      body: JSON.stringify({ amount: payload.amount, from: payload.from, to: payload.to }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { result, unitTo, unitFrom, timestamp } = await res.json();
    setState({
      ...state,
      fromCurrency: payload.from,
      toCurrency: payload.to,
      fromValue: payload.amount,
      toValue: result,
      unitFromValue: unitFrom,
      unitToValue: unitTo,
      lastUpdate: timestamp,
      unitFromHistorical: unitFrom,
      unitToHistorical: unitTo,
    });
  };

  const changeHandlerCurrency = async () => {
    const res = await fetch('/api/convert', {
      method: 'POST',
      body: JSON.stringify({ amount: state.fromValue, from: state.fromCurrency, to: state.toCurrency }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { result, unitTo, unitFrom, timestamp } = await res.json();
    setState({ ...state, fromValue: state.fromValue, toValue: result, unitFromValue: unitFrom, unitToValue: unitTo, lastUpdate: timestamp });
    setDate(state.date);
  };

  return { state, setFromCurrency, setToCurrency, setDate, getConversion, setCurrencies, setInitialQuery, changeHandlerCurrency };
};

export default useInitialState;
