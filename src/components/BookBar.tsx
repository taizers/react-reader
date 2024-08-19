import { Box, Button } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SelectComponent from "./Select";
import SliderComponent from "./Slider";

interface BookBarProps {
    font: string,
    setFont: Dispatch<SetStateAction<string>>,
    fontSize: number,
    setFontSize: (data: number) => void,
    chapterInfo: {
        chapters: string[],
        currentChapter: number,
        setCurrentChapter: (data: number) => void,
    }
}
 
const fonts = ['Sans Serif','Courier new', 'Georgia', 'Helvetica', 'Comic sans', 'Roboto', 'Arial'];

const BookBar: FC<BookBarProps> = ({font, setFont, fontSize, setFontSize, chapterInfo}) => {
    const [isVisible, setVissible] = useState<boolean>(false);

    return (
        <Box sx={{position: 'sticky', top: '63px', display: 'flex', p:'5px', '@media(max-width: 780px)' : { flexDirection: 'column', alignItems: 'center', gap: '20px'}, justifyContent: `${isVisible ? 'space-between' : 'end'}`, zIndex: '99', backgroundColor: '#8ed2f1', borderRadius: '10px'}}>
            <Box sx={{display: `${isVisible ? 'flex' : 'none'}`, flexGrown:1, ml:1, '@media(max-width: 780px)' : { flexDirection: 'column', gap: '20px', alignItems: 'stretch'}, gap: '15px',  alignItems: 'center', }}>
                {
                /*TODO убрать фон в сложенном режиме для book toolbar */
                /*TODO подобрать нормальный задний фон для book toolbar*/
                <>
                    <SelectComponent array={fonts} setValue={setFont} value={font} name="font-select" />
                    <SliderComponent fontSize={fontSize} setFontSize={setFontSize} />
                    <SelectComponent array={chapterInfo.chapters} index setValue={(value: string) => {chapterInfo.setCurrentChapter(+value)}} value={chapterInfo.currentChapter.toString()} name="chapter-select" />
                </>
                }
            </Box>

            <Button sx={{justifySelf: 'end', p: 0, '@media(max-width: 780px)' : { alignSelf: `${isVisible ? 'center' : 'end'}`}}}  onClick={() => setVissible(!isVisible)}>
                {!!isVisible ? <CloseIcon sx={{fontSize: '50px', '@media(max-width: 560px)' : {fontSize: '30px'} }} /> : <MenuIcon sx={{fontSize: '50px', '@media(max-width: 560px)' : {fontSize: '30px'}}} />}
            </Button>
        </Box>
    );
}
 
export default BookBar;