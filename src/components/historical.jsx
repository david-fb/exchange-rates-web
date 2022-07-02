import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function Historical() {
  const [date, setDate] = useState(dayjs());
  return (
    <section className="w-10/12 max-w-3xl flex flex-col gap-4 items-start">
      <h2 className="self-center text-xl">Historical exchange rates</h2>
      <p>Fecha</p>
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

      <div className="w-full grid grid-cols-2 gap-4">
        <div className="p-8 border border-zinc-200 rounded">
          <h3>Convertir USD a Peso colombiano</h3>
        </div>
        <div className="p-8 border border-zinc-200 rounded">
          <h3>Convertir Peso colombiano a USD</h3>
        </div>
      </div>
    </section>
  );
}
