import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import useAppContext from '@hooks/useAppContext';

export default function Historical() {
  const { state, setDate } = useAppContext();
  const { date } = state;

  return (
    <section className="w-10/12 max-w-3xl flex flex-col gap-4 items-start">
      <h2 className="self-center text-2xl font-semibold text-emerald-400">Historical exchange rates</h2>
      <p>Date</p>
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

      <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="p-8 border border-zinc-200 rounded">
          <h3>Convertir USD a Peso colombiano</h3>
          <p>Today {state.default}</p>
          <ul className="flex flex-col">
            <li className="flex justify-between">
              <span>1 USD</span> &gt; <span>4000 COP</span>
            </li>
            <li className="flex justify-between">
              <span>5 USD</span> &gt; <span>20000 COP</span>
            </li>
            <li className="flex justify-between">
              <span>10 USD</span> &gt; <span>40000 COP</span>
            </li>
          </ul>
        </div>
        <div className="p-8 border border-zinc-200 rounded">
          <h3>Convertir Peso colombiano a USD</h3>
          <ul className="flex flex-col">
            <li className="flex justify-between">
              <span>1 COP</span> &gt; <span>0.00024 USD</span>
            </li>
            <li className="flex justify-between">
              <span>5 COP</span> &gt; <span>0.00024 USD</span>
            </li>
            <li className="flex justify-between">
              <span>10 COP</span> &gt; <span>0.00024 USD</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
