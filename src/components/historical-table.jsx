const numbers = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000, 50000];

export default function HistoricalTable({ fromCode, fromName, toCode, toName, baseValue }) {
  return (
    <div className="p-8 border border-zinc-200 rounded">
      <h3 className="font-semibold text-lg">
        Convert {fromName} to {toName}
      </h3>
      <ul className="flex flex-col">
        {numbers.map((number, index) => (
          <li className="flex justify-between" key={`historical-item-${index}`}>
            <span>{`${number} ${fromCode}`}</span>
            <span>
              = {baseValue * number <= 0.01 ? (baseValue * number).toFixed(5) : (baseValue * number).toFixed(2)} {toCode}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
