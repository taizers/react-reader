import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import { StyledApp } from "../styled";
import SideBar from "./Sidebar/Sidebar";

const LayOut: FC = () => {
   
    return <StyledApp>
        <SideBar child={<Outlet />} />
    </StyledApp>
}

export default LayOut;