import endPoints from '.';

const getCurrencies = async () => {
  const res = await fetch(endPoints.currencies());
  const data = await res.json();
  return data;
};

//base USD
const getLatest = async () => {
  const res = await fetch(endPoints.latest());
  const data = await res.json();
  return data;
};

const getHistorical = async (date, symbo1, symbol2) => {
  const res = await fetch(endPoints.historical(date, symbo1, symbol2));
  const data = await res.json();
  return data;
};

const convert = async (amount, from, to) => {
  const res = await fetch(endPoints.convert(amount, from, to));
  const data = await res.json();
  return data;
};

module.exports = { getCurrencies, getLatest, getHistorical, convert };
