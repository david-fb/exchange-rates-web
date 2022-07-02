import Head from 'next/head';
import Converter from '@components/converter';
import Historical from '@components/historical';

export default function Home() {
  return (
    <>
      <Head>
        <title>Currency Converter</title>
        <meta name="description" content="Currency Converter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-start gap-8 items-center min-h-screen">
        <h1>CURRENCY CONVERTER</h1>
        <Converter />
        <Historical />
      </main>
    </>
  );
}
