import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type AutoCompleteComponentType = {
  options: Array<{id: number, title: string}>;
  label: string;
  placeholder: string;
  setValues: (values: Array<{id: number, title: string}> | null) => void;
}

const AutoCompleteComponent: React.FC<AutoCompleteComponentType> = ({options, label, placeholder, setValues}) => {
  return (
    <Autocomplete
      multiple
      sx={{mb: 1, mt: 1}}
      id="checkboxes-tags"
      options={options}
      fullWidth
      onChange={(event: React.SyntheticEvent, newValues) => {
        setValues(newValues);
      }}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
}

export default AutoCompleteComponent;
