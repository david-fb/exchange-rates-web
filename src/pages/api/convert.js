import { convert } from '@services/api/exchangeRates';

export default async function handler(req, res) {
  const { body } = req;
  const { amount, from, to } = body;

  const data = await convert(amount, from, to);

  res.status(200).json(data);
}
