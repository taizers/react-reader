import { Users } from './Users';
import { connect } from 'react-redux';

import { getAllUsers, deleteUser } from '../../actions/users';
import { UsersType } from '../../constants/tsSchemes';

const mapStateToProps = (state: { users: { 
    isLoading: boolean,
    users: {users: any, totalPages: number},
}}) => ({
  isLoading: state.users.isLoading,
  users: state.users.users,
});

const mapDispatchToProps = (dispatch: any) => ({
    getAllUsers: (page: number, limit?: number) => dispatch(getAllUsers(page, limit)),
    deleteUser: (id: string) => dispatch(deleteUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
