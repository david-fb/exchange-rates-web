import Head from 'next/head';
import Converter from '@components/converter';
import Historical from '@components/historical';
import { getCurrencies } from '@services/api/exchangeRates';
import useAppContext from '@hooks/useAppContext';
import { useEffect } from 'react';

export default function Home({ currencies }) {
  const { setCurrencies } = useAppContext();

  useEffect(() => {
    setCurrencies(currencies);
  }, []);

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
