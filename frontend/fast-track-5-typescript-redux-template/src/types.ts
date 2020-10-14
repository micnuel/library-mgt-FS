// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'

//Author
export const ADD_AUTHOR = 'ADD_AUTHOR'
export const REMOVE_AUTHOR = 'REMOVE_AUTHOR'
export const UPDATE_AUTHOR = 'UPDATE_AUTHOR'
export type Author = {
  id?: string
  firstName: string
  lastName: string
  books?: Book[]
}
export type AuthorState = {
  inTray: Author[]
  authors: Author[]
}

export type AddAuthorAction = {
  type: typeof ADD_AUTHOR
  payload: {
    author: Author
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

//Books
export const ADD_BOOK = 'ADD_BOOK'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const FETCH_BOOKS = 'FETCH_BOOKS'
export type Book = {
  id?: string
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

//User
export type User = {
  id: string
  firstName: string
  email: string
}

//Borrow

export type Borrow = {
  id: string
  borrowerId: string
  bookId: Book[]
  returnDate: Date
  borrowDate: Date
}

// Enum
export enum DialogType {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

// A product
export type Product = {
  id: string
  name: string
  price: number
}

export type AddProductAction = {
  type: typeof ADD_PRODUCT
  payload: {
    product: Product
  }
}

export type RemoveProductAction = {
  type: typeof REMOVE_PRODUCT
  payload: {
    product: Product
  }
}

export type ToggleDialogAction = {
  type: typeof TOGGLE_DIALOG
  payload: {
    dialog: DialogType
  }
}

export type UiActions = ToggleDialogAction

// Use this union in reducer
export type ProductActions = AddProductAction | RemoveProductAction

export type ProductState = {
  inCart: Product[]
}

// Using dynamic keys from an enum
export type UiState = {
  dialogOpen: {
    [key in DialogType]?: boolean
  }
}

export type AppState = {
  product: ProductState
  ui: UiState
  author: AuthorState
  book: BookState
}
