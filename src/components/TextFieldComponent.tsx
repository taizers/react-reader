import { FC } from 'react';
import TextField from '@mui/material/TextField';

type TextFieldType = {
  label: string;
  type?: string;
  fullWidth?: boolean;
  autoFocus?: boolean;
  variant?: 'outlined' | 'standard' | 'filled';
  margin?: 'dense' | 'normal' | 'none';
  id: string;
  onChangeFunction: (data: string) => void;
};

const TextFieldComponent: FC<TextFieldType> = ({
  label,
  id,
  type = 'text',
  margin = 'dense',
  variant = 'standard',
  autoFocus = true,
  fullWidth = true,
  onChangeFunction,
}) => {
  return (
    <TextField
      autoFocus={autoFocus}
      margin={margin}
      id={id}
      label={label}
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      onChange={(evt) => onChangeFunction(evt.target.value)}
    />
  );
};

export default TextFieldComponent;
