import SelectCurrency from './select-currency';
import useAppContext from '@hooks/useAppContext';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useRef } from 'react';

export default function Converter() {
  const { state, setFromCurrency, setToCurrency, getConversion } = useAppContext();
  const { fromCurrency, toCurrency, fromValue, toValue, unitFromValue } = state;
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const debouncedChangeHandler = useDebouncedCallback((value, origin) => getConversion(value, origin), 500);

  useEffect(() => {
    if (!fromInputRef.current && !toInputRef.current) return;
    fromInputRef.current.value = state.fromValue;
    toInputRef.current.value = state.toValue;
  }, [state.fromValue, state.toValue]);

  return (
    <section className="w-10/12 max-w-3xl border border-zinc-200 rounded p-8">
      <p className="text-lg">
        1 <span className="font-bold">{fromCurrency}</span> is equal to {unitFromValue} <span className="font-bold">{toCurrency}</span>
      </p>
      <section className="w-full grid grid-rows-2 grid-cols-1 gap-4 sm:grid-flow-col sm:grid-cols-2">
        <SelectCurrency selected={fromCurrency} setSelected={setFromCurrency} />
        <input
          defaultValue={fromValue}
          ref={fromInputRef}
          onChange={(e) => debouncedChangeHandler(e.target.value, 'fromValue')}
          className="bg-slate-100 px-3 py-4 rounded-t text-lg focus:outline-none focus:ring ring-emerald-200 border-b-2 border-emerald-300 focus-visible:border-teal-500 focus-visible:border"
          type="number"
        />
        <SelectCurrency selected={toCurrency} setSelected={setToCurrency} />
        <input
          defaultValue={toValue}
          ref={toInputRef}
          onChange={(e) => debouncedChangeHandler(e.target.value, 'toValue')}
          className="bg-slate-100 px-3 py-4 rounded-t text-lg focus:outline-none focus:ring ring-emerald-200 border-b-2 border-emerald-300 focus-visible:border-teal-500 focus-visible:border"
          type="number"
        />
      </section>
    </section>
  );
}
