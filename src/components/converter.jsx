import SelectCurrency from './select-currency';
import useAppContext from '@hooks/useAppContext';
export default function Converter() {
  const { state, setFromCurrency, setToCurrency, getConversion } = useAppContext();
  const { fromCurrency, toCurrency, fromValue, toValue } = state;

  const handleOnChangeTo = (e) => {
    const value = e.target.value;
    getConversion(value, 'toValue');
  };

  const handleOnChangeFrom = (e) => {
    const value = e.target.value;
    getConversion(value, 'fromValue');
  };

  return (
    <section className="w-10/12 max-w-3xl grid grid-rows-2 grid-cols-1 gap-4 sm:grid-flow-col sm:grid-cols-2 p-8 border border-zinc-200 rounded">
      <SelectCurrency selected={fromCurrency} setSelected={setFromCurrency} />
      <input
        value={fromValue}
        onChange={handleOnChangeFrom}
        className="bg-slate-100 px-3 py-4 rounded text-lg focus:outline-none focus:ring ring-emerald-200 border-b-2 border-emerald-300 focus:border-0"
        type="number"
      />
      <SelectCurrency selected={toCurrency} setSelected={setToCurrency} />
      <input
        value={toValue}
        onChange={handleOnChangeTo}
        className="bg-slate-100 px-3 py-4 rounded text-lg focus:outline-none focus:ring ring-emerald-200 border-b-2 border-emerald-300 focus:border-0"
        type="number"
      />
    </section>
  );
}
