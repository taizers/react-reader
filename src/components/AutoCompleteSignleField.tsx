import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

type AutoCompleteSignleFieldType = {
    options: Array<{id: number, label: string}>;
    label: string;
    setValue: (value: number | null) => void;
  };

const AutoCompleteSignleField: React.FC<AutoCompleteSignleFieldType> = ({label, setValue, options = []}) =>  {
  return (
    <Autocomplete
      disablePortal
      id="combo-box"
      onChange={(event: React.SyntheticEvent, newValue) => {
        newValue && setValue(newValue.id);
      }}
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default AutoCompleteSignleField;
