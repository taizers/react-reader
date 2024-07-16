import React, { FC } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

interface DatePickerComponentType {
  value: Date | null | Dayjs;
  setValue: (data: Date | null | Dayjs) => void;
  label: string;
}

const DatePickerComponent: FC<DatePickerComponentType> = ({
  value,
  setValue,
  label,
}) => {
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
        <DemoContainer components={['DatePicker']}>
          <DemoItem label={label}>
            <DatePicker
              value={dayjs(value)}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
};

export default DatePickerComponent;
