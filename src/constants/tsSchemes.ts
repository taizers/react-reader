interface IDateValues {
  updated_at: Date | null;
  created_at: Date | null;
  deleted_at: Date | null;
}

export type stateValuesType = 'not' | 'read' | 'later' | 'reading' | null;
export type Statusestypes = 'not' | 'read' | 'later' | 'reading' | 'add' | 'delete';

export interface IUser extends IDateValues {
  id: string;
  role: string | null;
  name: string | null;
  email?: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export type SignUpUserType = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserType = {
  id: string;
  name?: string;
  newPassword?: string;
  oldPassword?: string;
};

export type AuthorItemType = {
  name: string;
  uri: string;
};

export type DownloadsType = {
  link: string;
  type: string;
};

export type BookType = {
  author: Array<AuthorItemType>;
  title: string;
  updated: string;
  cover?: string;
  categories: Array<string>;
  downloads: Array<DownloadsType>;
  description: string;
};

export interface ISeria extends IDateValues {
  annotation: string;
  author: string;
  cover: string |null;
  id : number;
  release_date: Date | null;
  title: string;
  user_id: number;
  booksCount: string;
  tags: Array<{ id: number; title: string }> | null;
  genres: Array<{ id: number; title: string }> | null;
};

export interface IOneSeria extends ISeria {
  seriabooks?: ILocalBook[];
};

interface ILibraryBook extends IDateValues {
  book_id: number;
  user_id: number;
  last_open: Date | null;
  last_page: number;
  progress: number | null,
  state: stateValuesType,
}

type UsersBooksType = {
  id: number;
  name: string;
  library_book: ILibraryBook;
}

interface IShortSeria {
  id: number,
  title: string
}
export interface ILocalBook extends IDateValues {
  id: number;
  title: string;
  updated: string | null;
  cover: string | null;
  privat: boolean;
  annotation: string | null;
  author: string | null;
  downloads: string | null;
  link: string | null;
  primory_link: string | null;
  release_date: string | null;
  seriabooks: IShortSeria;
  seria_id: string | null;
  source: string | null;
  tags: Array<{ id: number; title: string }> | null;
  genres: Array<{ id: number; title: string }> | null;
  user_id: number;
  UsersBooks?: Array<UsersBooksType>;
  library_book?: ILibraryBook;
  
};

export interface ILocalBookResponce {
  book: ILocalBook;
  translates: IBookTranslateItem[];
}

export interface IBookTranslateItem {
  field: string,
  label: string,
}

export type AuthorType = {
  author: Array<AuthorItemType>;
  title: string;
  updated: string;
  cover?: string;
  categories: Array<string>;
  downloads: Array<DownloadsType>;
  description: string;
};

export type BookInfoType = {
  id: number;
  title: string;
  author: string;
};

export type BookFileType = {
  id: string;
  file: Buffer;
  fileName: string;
  filePath?: string;
};

export type UsersType = Array<IUser>;

export type BooksType = Array<BookType>;

export type BooksResponceType = {
  items: Array<BookType>;
  currentPage: number;
  totalCountItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type UsersResponceType = {
  items: Array<BookType>;
  currentPage: number;
  totalCountItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};



type statusObjectType = {
  labelR: string;
  LabelEn: string;
  icon: JSX.Element;
};

export type statusesObjectType = {
  reading: statusObjectType;
  later: statusObjectType;
  read: statusObjectType;
  not: statusObjectType;
  delete: statusObjectType;
  add: statusObjectType;
};

interface BookContent {
  title: string;
  content: string;
}
export interface BookText {
  author: string;
  title: string;
  language: string;
  content: BookContent[];
  annotation?: string[];
  genre?: string[];
}
