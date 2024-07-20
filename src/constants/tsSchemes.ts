export type UserType = {
  id: string;
  role: string | null;
  name: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
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

export type AuthorType = {
  name: string;
  uri: string;
};

export type DownloadsType = {
  link: string;
  type: string;
};

export type BookType = {
  author: Array<AuthorType>;
  title: string;
  updated: string;
  cover?: string;
  categories: Array<string>;
  downloads: Array<DownloadsType>;
  description: string;
};

type SeriaType = {
  annotation: string;
  author: string;
  cover:string |null;
  id : number;
  release_date:string |null;
  title: string;
  updated_at: Date | null;
  created_at: Date | null;
  deleted_at: Date | null;
};

type LibraryBookType = {
  book_id: number;
  user_id: number;
  last_open: Date | null;
  last_page: number;
  progress: number | null,
  state: 'not' | 'read' | 'later' | 'reading' | null,
  updated_at: Date | null;
  created_at: Date | null;
  deleted_at: Date | null;
}

type UsersBooksType = {
  id: number;
  name: string;
  library_book: LibraryBookType;
}

export type LocalBookType = {
  id: number;
  title: string;
  updated: string | null;
  cover: string | null;
  annotation: string | null;
  author: string | null;
  downloads: string | null;
  link: string | null;
  primory_link: string | null;
  release_date: string | null;
  seria: SeriaType | null;
  seria_id: string | null;
  source: string | null;
  tags: Array<{ id: number; title: string }> | null;
  genres: Array<{ id: number; title: string }> | null;
  user_id: number;
  UsersBooks: Array<UsersBooksType>;
  updated_at: Date | null;
  created_at: Date | null;
  deleted_at: Date | null;
};

export type AuthorRType = {
  author: Array<AuthorType>;
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

export type UsersType = Array<UserType>;
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
