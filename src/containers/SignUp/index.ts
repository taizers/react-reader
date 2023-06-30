import { SignUp } from './SignUp';
import { connect } from 'react-redux';
import { signUp } from '../../actions/auth';
import { SignUpUserType } from '../../constants/tsSchemes';

const mapStateToProps = (state: { auth: { isLoading: boolean }}) => ({
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
  signUp: (data: { data: SignUpUserType; history: any }) => dispatch(signUp(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);