import React, { FC, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';

import DotMenu from '../../components/DotMenu/index';
import { UsersType } from '../../constants/tsSchemes';
import { startPage } from '../../constants/constants';

type UsersComponetTypes = {
    getAllUsers : (page: number, limit?: number) => Promise<any>;
    isLoading: boolean;
    users: {users: any, totalPages: number};
    deleteUser: (id: string) => Promise<any>;
}

export const Users: FC<UsersComponetTypes> = ({
    getAllUsers,
    users,
    isLoading,
    deleteUser,
}) => {
    const history = useNavigate();
    const [page, setPage] = useState(startPage);
    console.log(users)
    useEffect(() => {
        getAllUsers(startPage);
    }, []);

    const onShowMoreClick = (id: string) => {
      history(`/users/${id}`);
    }

    const onDeleteClick = (id: string) => {
      deleteUser(id);
    }

    const onPaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
      window.scrollTo(0, 0);
      setPage(value - 1);
      getAllUsers(value - 1);
    };

    return (
      <Box sx={{width: '100%'}}>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {users?.totalPages && <TableContainer component={Paper}>
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
              {users?.users?.map((user:any) => (
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
        }
        {!users?.totalPages && 
          <Typography
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, fontSize: 22 }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {'Нет данных'}
          </Typography>}
        {users?.totalPages && <Pagination 
            count={users.totalPages} 
            color="primary"
            defaultPage={1} 
            boundaryCount={2} 
            page={page + 1} 
            onChange={onPaginationChange} 
        />
      }
      </Box>
      </Box>
    );
}