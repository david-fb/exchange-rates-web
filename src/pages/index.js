import Head from 'next/head';
import Converter from '@components/converter';
import Historical from '@components/historical';
import { getCurrencies } from '@services/api/exchangeRates';
import useAppContext from '@hooks/useAppContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home({ currencies }) {
  const { state, setCurrencies, setInitialQuery, changeHandlerCurrency } = useAppContext();
  const router = useRouter();
  const [initalLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    setCurrencies(currencies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!initalLoading) return;
    if (!router.isReady) return;
    const { amount, from, to } = router.query;

    const badDataRedirect = () => {
      router.push({
        pathname: '/',
        query: {
          from: 'USD',
          to: 'COP',
          amount: '1',
        },
      });
    };
    if (amount == null || from == null || to == null) return badDataRedirect();
    if (amount === '' || from === '' || to === '') return badDataRedirect();

    const validCurrencyCode = (currency) => {
      currency = currency.toUpperCase();
      return Object.keys(currencies).some((curencyKey) => currency === curencyKey);
    };

    const isFromValid = validCurrencyCode(from);
    const isToValid = validCurrencyCode(to);
    const isAmountValid = !isNaN(Number(amount));

    if (!isFromValid || !isToValid || !isAmountValid) return badDataRedirect();
    setInitialQuery({
      from,
      to,
      amount,
    });
    setInitialLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (!router.isReady) return;
    if (state.fromCurrency === '' && state.toCurrency === '') return;

    //every time any currency code is changed, the values are updated
    const { from, to } = router.query;
    if (state.fromCurrency !== from || state.toCurrency !== to) {
      changeHandlerCurrency();
    }

    router.push(
      {
        pathname: '/',
        query: {
          from: state.fromCurrency,
          to: state.toCurrency,
          amount: state.fromValue,
        },
      },
      undefined,
      { shallow: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.fromCurrency, state.toCurrency, state.fromValue]);

  return (
    <>
      <Head>
        <title>Currency Converter</title>
        <meta name="description" content="Currency Converter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-start gap-8 items-center min-h-screen">
        <h1 className="mt-8 text-3xl font-bold text-emerald-400">CURRENCY CONVERTER</h1>
        <Converter />
        <Historical />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const currencies = await getCurrencies();
  return {
    props: {
      currencies,
    },
  };
}
