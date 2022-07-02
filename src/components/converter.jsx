import SelectCurrency from './select-currency';
export default function Converter() {
  return (
    <section className="w-10/12 max-w-3xl grid grid-rows-2 grid-cols-1 gap-4 sm:grid-flow-col sm:grid-cols-2 p-8 border border-zinc-200 rounded">
      <SelectCurrency />
      <input className="bg-slate-100 px-3 py-4 rounded text-lg focus:outline-none focus:ring ring-emerald-200 border-b-2 border-emerald-300 focus:border-0" type="number" />
      <SelectCurrency />
      <input className="bg-slate-100 px-3 py-4 rounded text-lg focus:outline-none focus:ring ring-emerald-200 border-b-2 border-emerald-300 focus:border-0" type="number" />
    </section>
  );
}
