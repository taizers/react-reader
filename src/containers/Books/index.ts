import { connect } from 'react-redux';

import { Books } from './Books';
import { BooksResponceType } from '../../constants/tsSchemes';
import { getBooks } from '../../actions/books';

const mapStateToProps = (state: { books: { isLoading: boolean, books: BooksResponceType }}) => ({
  isLoading: state.books.isLoading,
  books: state.books.books,
});

const mapDispatchToProps = (dispatch: any) => ({
  getBooks: (query:string, page?: number, limit?: number) => dispatch(getBooks(query, page, limit)),
  // getAuthors: (query:string, page?: number, limit?: number) => dispatch(getAuthors(query, page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
