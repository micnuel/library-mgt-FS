import { Dispatch } from 'redux'

import { ADD_BOOK, Book, BookActions, FETCH_BOOKS, User } from '../../types'

export function addBook(book: Book): BookActions {
  return {
    type: ADD_BOOK,
    payload: {
      book,
    },
  }
}
export function setBooks(books: Book[]): BookActions {
  return {
    type: FETCH_BOOKS,
    payload: {
      books,
    },
  }
}
// Async action processed by redux-thunk middleware
export function createBook(book: Book) {
  return (dispatch: Dispatch) => {
    return fetch(`http://localhost:5000/api/v1/books`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(book),
    }).then((resp) => resp.json())
  }
}

//remove
export function borrowBookss() {
  return (dispatch: Dispatch) => {
    return fetch(`http://localhost:5000/api/v1/borrows`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((resp) => resp.json())
      .then((book) => {
        dispatch(addBook(book)) // should this be books
      })
  }
}

export function fetchBooks() {
  return (dispatch: Dispatch) => {
    return fetch(`http://localhost:5000/api/v1/books`)
      .then((resp) => resp.json())
      .then((books) => {
        dispatch(setBooks(books))
      })
  }
}
