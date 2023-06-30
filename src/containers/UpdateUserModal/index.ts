import { UpdateUserModal } from './UpdateUserModal';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/users';
import { UserType, UpdateUserType } from '../../constants/tsSchemes';

const mapStateToProps = (state: { auth: { isLoading: boolean, authUser: UserType }}) => ({
    isLoading: state.auth.isLoading,
    user: state.auth.authUser,
});

const mapDispatchToProps = (dispatch: any) => ({
    updateUser: (data: UpdateUserType) => dispatch(updateUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserModal);