import { Sidebar } from './Sidebar';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const mapStateToProps = (state: { auth: { isAuth: boolean}}) => ({
    isAuth: state.auth.isAuth,
});

const mapDispatchToProps = (dispatch: any) => ({
    logout: (history: any) => dispatch(logout(history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);