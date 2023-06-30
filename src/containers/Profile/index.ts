import { Profile } from './Profile';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { LoginUserType, UserType } from '../../constants/tsSchemes';

const mapStateToProps = (state: { auth: { isLoading: boolean, authUser: UserType }}) => ({
  isLoading: state.auth.isLoading,
  user: state.auth.authUser,
});

const mapDispatchToProps = (dispatch: any) => ({
  login: (data: { data: LoginUserType; history: any }) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
