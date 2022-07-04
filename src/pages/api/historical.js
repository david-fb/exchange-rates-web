import { getHistorical } from '@services/api/exchangeRates';

export default async function handler(req, res) {
  const { body } = req;
  const { date, symbol1, symbol2 } = body;

  const data = await getHistorical(date, symbol1, symbol2);

  res.status(200).json(data);
}
