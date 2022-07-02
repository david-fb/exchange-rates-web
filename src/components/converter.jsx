import SelectCurrency from './select-currency';
export default function Converter() {
  return (
    <section className="max-w-3xl grid grid-col-2 grid-flow-col gap-4 border border-zinc-200 rounded p-8">
      <div className="flex flex-col gap-4">
        <SelectCurrency />
        <input className="bg-slate-100 px-3 py-4 rounded text-lg" type="number" />
      </div>
      <div className="flex flex-col gap-4">
        <SelectCurrency />
        <input className="bg-slate-100 px-3 py-4 rounded text-lg" type="number" />
      </div>
    </section>
  );
}
