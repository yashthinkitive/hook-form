
import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  name: string;
  label: string;
  options: Option[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ name, label, options }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          select
          label={label}
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : ''}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default CustomSelect;
