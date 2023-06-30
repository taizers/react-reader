import { PublicRoute } from './PublicRoute';
import { connect } from 'react-redux';

const mapStateToProps = (state: { auth: { isAuth: boolean }}) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(PublicRoute);
