// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'

//Author
export const ADD_AUTHOR = 'ADD_AUTHOR'
export const REMOVE_AUTHOR = 'REMOVE_AUTHOR'
export const UPDATE_AUTHOR = 'UPDATE_AUTHOR'
export const FETCH_AUTHORS = 'FETCH_AUTHORS'
export type Author = {
  _id?: string
  firstName: string
  lastName: string
  books?: Book[]
  token: any
}
export type AuthorState = {
  inTray: Author[]
  authors: Author[]
  update: Author[]
}

export type AddAuthorAction = {
  type: typeof ADD_AUTHOR
  payload: {
    author: Author
  }
}
export type SetAuthorAction = {
  type: typeof FETCH_AUTHORS
  payload: {
    authors: Author[]
  }
}

export type RemoveAuthorAction = {
  type: typeof REMOVE_AUTHOR
  payload: {
    author: Author
  }
}

export type UpdateAuthorAction = {
  type: typeof UPDATE_AUTHOR
  payload: {
    author: Author
  }
}
export type AuthorActions =
  | AddAuthorAction
  | RemoveAuthorAction
  | UpdateAuthorAction
  | SetAuthorAction

//Books
export const ADD_BOOK = 'ADD_BOOK'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const FETCH_BOOKS = 'FETCH_BOOKS'
export type Book = {
  _id?: string
  name: string
  isbn: string
  category: string[]
  publisher: string
  description: string
  status: string
  authors?: Author[]
  publishedYear?: number
}
export type SetBookAction = {
  type: typeof FETCH_BOOKS
  payload: {
    books: Book[]
  }
}
export type BookState = {
  inTray: Book[]
  books: Book[]
  update: Book[]
}

export type AddBookAction = {
  type: typeof ADD_BOOK
  payload: {
    book: Book
  }
}

export type RemoveBookAction = {
  type: typeof REMOVE_BOOK
  payload: {
    book: Book
  }
}

export type UpdateBookAction = {
  type: typeof UPDATE_BOOK
  payload: {
    book: Book
  }
}
export type BookActions =
  | AddBookAction
  | RemoveBookAction
  | UpdateBookAction
  | SetBookAction

// Borrow

export const ADD_BORROW = 'ADD_BORROW'
export const REMOVE_BORROW = 'REMOVE_BORROW'
export const UPDATE_BORROW = 'UPDATE_BORROW'
export const FETCH_BORROW = 'FETCH_BORROW'
export type Borrow = {
  _id: string
  borrowerId: User[]
  bookId: Book[]
}
export type BorrowState = {
  inTray: Borrow[]
  borrow: Borrow[]
}

export type AddBorrowAction = {
  //remove
  type: typeof ADD_BORROW
  payload: {
    bookId: Borrow
  }
}
//might remove this
export type SetBorrowAction = {
  type: typeof FETCH_BORROW
  payload: {
    borrow: Borrow[]
  }
}

export type RemoveBorrowAction = {
  type: typeof REMOVE_BORROW
  payload: {
    bookId: Borrow
  }
}

export type UpdateBorrowAction = {
  type: typeof UPDATE_BORROW
  payload: {
    borrow: Borrow
  }
}
export type BorrowActions =
  | AddBorrowAction
  | RemoveBorrowAction
  | UpdateBorrowAction
  | SetBorrowAction

//User
export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const FETCH_USERS = 'FETCH_USERS'
export const LOGIN = 'LOGIN'
export type User = {
  _id?: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}
export type Login = {
  email: string
  password: string
}
export type SetUserAction = {
  type: typeof FETCH_USERS
  payload: {
    users: User[]
  }
}
export type UserState = {
  inTray: User[]
  users: User[]
  user?: User
  update: User[]
}

export type AddUserAction = {
  type: typeof ADD_USER
  payload: {
    user: User
  }
}
export type loginAction = {
  type: typeof LOGIN
  payload: {
    user: User
  }
}

export type RemoveUserAction = {
  type: typeof REMOVE_USER
  payload: {
    user: User
  }
}

export type UpdateUserAction = {
  type: typeof UPDATE_USER
  payload: {
    user: User
  }
}
export type UserActions =
  | AddUserAction
  | RemoveUserAction
  | UpdateUserAction
  | SetUserAction
  | loginAction

export type AppState = {
  author: AuthorState
  book: BookState
  user: UserState
  borrow: BorrowState
}
