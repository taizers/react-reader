import { SingleUser } from './SingleUser';
import { connect } from 'react-redux';
import { getUser } from '../../actions/users';
import { UserType } from '../../constants/tsSchemes';

const mapStateToProps = (state: { users: { isLoading: boolean, user: UserType }}) => ({
  isLoading: state.users.isLoading,
  user: state.users.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  getUser: (id: string) => dispatch(getUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);
