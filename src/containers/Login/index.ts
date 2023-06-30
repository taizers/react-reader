import { Login } from './Login';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { LoginUserType } from '../../constants/tsSchemes';

const mapStateToProps = (state: { auth: { isLoading: boolean }}) => ({
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
  login: (data: { data: LoginUserType; history: any }) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
