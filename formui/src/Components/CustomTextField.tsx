
import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface CustomTextFieldProps {
  name: string;
  label: string;
  type?: string;
  control?:any;
  error?:any;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ name, label, type = 'text',control }) => {


  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : ''}
        />
      )}
    />
  );
};

export default CustomTextField;
