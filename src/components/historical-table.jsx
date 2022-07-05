const numbers = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000, 50000];

export default function HistoricalTable({ fromCode, fromName, toCode, toName, baseValue }) {
  return (
    <div className="border border-zinc-200 rounded">
      <div className="border-b p-8 pb-4 bg-emerald-50">
        <h3 className="font-semibold text-lg text-emerald-400 text-center">
          Convert {fromName} to {toName}
        </h3>
      </div>
      <ul className="flex flex-col p-8 pt-4">
        {numbers.map((number, index) => (
          <li className="flex justify-between mb-2" key={`historical-item-${index}`}>
            <a href={`/?from=${fromCode}&to=${toCode}&amount=${number}`} className="w-1/2 text-emerald-500 hover:underline">
              {`${number} ${fromCode}`}
            </a>
            <p className="w-1/2">
              = {baseValue * number <= 0.01 ? (baseValue * number).toFixed(5) : (baseValue * number).toFixed(2)} {toCode}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
