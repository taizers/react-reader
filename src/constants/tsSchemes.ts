export type UserType = {
    id: string;
    name: string;
    email: string;
    isActivated: string;
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