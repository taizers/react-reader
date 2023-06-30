import React, { FC, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

import DotMenu from '../../components/DotMenu/index';
import { UsersType } from '../../constants/tsSchemes';

type UsersComponetTypes = {
    getAllUsers : () => Promise<any>;
    isLoading: boolean;
    users: UsersType;
    deleteUser: (id: string) => Promise<any>;
}

export const Users: FC<UsersComponetTypes> = ({
    getAllUsers,
    users,
    isLoading,
    deleteUser,
}) => {
    const history = useNavigate();
  
    useEffect(() => {
        getAllUsers();
    }, []);

    const onShowMoreClick = (id: string) => {
      history(`/users/${id}`);
    }

    const onDeleteClick = (id: string) => {
      deleteUser(id);
    }

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell> 
                <TableCell align="center">Имя</TableCell> 
                <TableCell align="center">Почта</TableCell>
                <TableCell align="center">Активирован</TableCell>    
                <TableCell align="center"></TableCell>    
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{user.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.isActivated ? 'Да' : 'Нет'}</TableCell>
                  <TableCell align="center"><DotMenu
                    id={user.id}
                    onShowMoreClick={onShowMoreClick}
                    onDeleteClick={onDeleteClick}
                  /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}