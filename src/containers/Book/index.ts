import { Book } from "./Book";
import { connect } from 'react-redux';

import { BooksResponceType } from '../../constants/tsSchemes';

const mapStateToProps = (state: { books: { isLoading: boolean, book: BooksResponceType }}) => ({
  isLoading: state.books.isLoading,
  book: state.books.book,
});

const mapDispatchToProps = (dispatch: any) => ({
  // getBook: (id:string) => dispatch(getBooksById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);