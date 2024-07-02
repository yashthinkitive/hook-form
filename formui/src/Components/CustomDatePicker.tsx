import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Grid, FormLabel } from '@mui/material';
import { Controller, useFormContext, FieldValues } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs'; 

interface CustomDatePickerProps {
  name: string;
  label: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ name, label }) => {
  const { control } = useFormContext<FieldValues>();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container direction="column">
        <FormLabel>{label}</FormLabel>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              {...field}
              value={field.value ? dayjs(field.value) : null} 
            onChange={(date: Dayjs | null) => field.onChange(date ? new Date(date.toDate()) : null)} 
         
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!fieldState.error,
                  helperText: fieldState.error ? fieldState.error.message : '',
                }
              }}
            />
          )}
        />
      </Grid>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
