import { FC } from "react";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectComponentProps {
    value: string;
    setValue: (data: string) => void;
    array: string[];
    name: string;
    variant?: "filled" | "outlined" | "standard",
    index?: boolean,
};
 
const SelectComponent: FC<SelectComponentProps> = ({value, setValue, array, name, variant = "standard", index}) => {
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event?.target?.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <Select
                    id={name}
                    variant={variant}
                    value={value}
                    onChange={handleChange}
                >
                    {array?.map((item, i) => index ? <MenuItem key={i} value={i}>{item}</MenuItem> : <MenuItem key={i} value={item}>{item}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    );
}
 
export default SelectComponent;