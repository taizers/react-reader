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

import DotMenu from '../components/DotMenu/index';
import { UsersType } from '../constants/tsSchemes';
import { defaultStartPage, defaultLimit } from '../constants/constants';
import { usersApiSlice } from '../store/reducers/UsersApiSlice';
import { useAppSelector, useShowErrorToast } from '../hooks';

const Users: FC = () => {
  const history = useNavigate();
  const [page, setPage] = useState<number>(defaultStartPage);
  const [limit, setLimit] = useState<number>(defaultLimit);

  const {
    data,
    error: getUsersError,
    isLoading: getUsersIsLoading,
  } = usersApiSlice.useGetUsersQuery({ page, limit });
  const [deleteUser, { data: deleted, error, isLoading }] =
    usersApiSlice.useDeleteUserMutation();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  useShowErrorToast(getUsersError);
  useShowErrorToast(error);

  const onShowMoreClick = (id: string) => {
    history(`/users/${id}`);
  };

  const onDeleteClick = (id: string) => {
    deleteUser(id);
  };

  const onPaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    window.scrollTo(0, 0);
    setPage(value - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {data?.totalPages && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Имя</TableCell>
                  <TableCell align="center">Почта</TableCell>
                  <TableCell align="center">Удалён</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.users?.map((user: any) => (
                  <TableRow
                    key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{user.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      {user.deleted_at ? 'Да' : 'Нет'}
                    </TableCell>
                    <TableCell align="center">
                      {currentUser?.id && user?.id && (
                        <DotMenu
                          id={user.id}
                          currentUserId={currentUser?.id}
                          onShowMoreClick={onShowMoreClick}
                          onDeleteClick={onDeleteClick}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!data?.totalPages && (
          <Typography
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 10,
              fontSize: 22,
            }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {'Нет данных'}
          </Typography>
        )}
        {data?.totalPages && (
          <Pagination
            count={data.totalPages}
            color="primary"
            defaultPage={1}
            boundaryCount={2}
            page={page + 1}
            onChange={onPaginationChange}
          />
        )}
      </Box>
    </Box>
  );
};

export default Users;
