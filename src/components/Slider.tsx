import { FC } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface SliderComponentProps {
    setFontSize: (data: number) => void,
    fontSize: number,
}
 
const SliderComponent: FC<SliderComponentProps> = ({setFontSize, fontSize}) => {
    const handleChange = (event: Event, newValue: number | number[]) => {
        setFontSize(newValue as number);
    };

    return (
        <Box sx={{ minWidth: 250 }}>
            <Slider
                aria-label="FontSize"
                defaultValue={16}
                value={fontSize} 
                onChange={handleChange}
                step={2}
                min={10}
                max={52}
            />
      </Box>
    );
}
 
export default SliderComponent;