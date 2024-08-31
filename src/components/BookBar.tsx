import { Box, Button } from "@mui/material";
import { FC, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SelectComponent from "./Select";
import SliderComponent from "./Slider";

interface BookBarProps {
    font: string,
    setFont: (data: string) => void,
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
    /*TODO подобрать нормальный задний фон для book toolbar*/

    return (
        <>
            {isVisible && <Box sx={{zIndex: 999, position: 'fixed', bottom: 0, left: 0, width: '100%', alignItems: 'center', display: `${isVisible ? 'flex' : 'none'}`, backgroundColor: '#aac8ff', p:1, gap: '15px', justifyContent: 'space-between', '@media(max-width: 780px)' : { flexDirection: 'column', gap: '20px'} }}>
                    <Button sx={{justifySelf: 'end', p: 0, order:4, '@media(max-width: 780px)' : { order: 0, }}}  onClick={() => setVissible(!isVisible)}>
                        <CloseIcon sx={{fontSize: '50px'}} />
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, gap: '20px', alignItems: 'center', '@media(max-width: 780px)' : { flexDirection: 'column', gap: '20px', alignItems: 'stretch', width: '100%'} }}>
                        <SelectComponent array={fonts} setValue={setFont} value={font} name="font-select" />
                        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', alignItems: 'center'}}><SliderComponent fontSize={fontSize} setFontSize={setFontSize} /><span>{`${fontSize}px`}</span></Box>
                        <SelectComponent array={chapterInfo.chapters} index setValue={(value: string) => {chapterInfo.setCurrentChapter(+value)}} value={chapterInfo.currentChapter.toString()} name="chapter-select" />
                    </Box>
            </Box>}
            {!isVisible && <Button sx={{zIndex: 999, position: 'fixed', right: 0, bottom: 0, p: 0,}}  onClick={() => setVissible(!isVisible)}>
                <MenuIcon sx={{fontSize: '55px',}} />
            </Button>}
        </>

    );
}
 
export default BookBar;