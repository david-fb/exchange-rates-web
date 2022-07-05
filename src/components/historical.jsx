import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import useAppContext from '@hooks/useAppContext';
import HistoricalTable from './historical-table';

export default function Historical() {
  const { state, setDate } = useAppContext();
  const { date, unitFromHistorical, unitToHistorical, fromCurrency, toCurrency, currencies, loading } = state;

  return (
    <section className="w-10/12 max-w-3xl flex flex-col gap-4 items-start">
      <h2 className="self-center text-2xl font-semibold text-emerald-400">Historical exchange rates</h2>
      <div>
        <p className="font-semibold">Date</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
            }}
            minDate={dayjs('2001-01-01')}
            maxDate={dayjs()}
            renderInput={(params) => <TextField {...params} helperText={params?.inputProps?.placeholder} />}
            inputFormat={'YYYY-MM-DD'}
          />
        </LocalizationProvider>
      </div>

      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
          <HistoricalTable fromCode={fromCurrency} fromName={currencies[fromCurrency]} toCode={toCurrency} toName={currencies[toCurrency]} baseValue={unitFromHistorical} />
          <HistoricalTable fromCode={toCurrency} fromName={currencies[toCurrency]} toCode={fromCurrency} toName={currencies[fromCurrency]} baseValue={unitToHistorical} />
        </div>
      )}
    </section>
  );
}
