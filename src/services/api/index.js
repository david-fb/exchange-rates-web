const API = process.env.EXCHANGE_RATES_API;

const endPoints = {
  latest: () => `${API}/latest`,
  convert: (amount, from, to) => `${API}/convert/${amount}/${from}/${to}`,
  currencies: () => `${API}/currencies`,
  historical: (date, symbol1, symbol2) => `${API}/historical/${date}/${symbol1}/${symbol2}`,
};

module.exports = endPoints;
