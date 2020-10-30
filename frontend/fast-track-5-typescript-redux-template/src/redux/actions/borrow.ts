import { Dispatch } from 'redux'

import { ADD_BORROW, Borrow, BorrowActions, FETCH_BORROW } from '../../types'

export function addBorrow(borrow: Borrow): BorrowActions {
  return {
    type: ADD_BORROW,
    payload: {
      borrow,
    },
  }
}
export function setBorrow(borrow: Borrow[]): BorrowActions {
  return {
    type: FETCH_BORROW,
    payload: {
      borrow,
    },
  }
}
// Async action processed by redux-thunk middleware
export function createBorrow(borrow: Borrow) {
  return (dispatch: Dispatch) => {
    return fetch(`http://localhost:5000/api/v1/borrows`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(borrow),
    }).then((resp) => resp.json())
  }
}

export function borrowBook(borrow: Borrow) {
  return (dispatch: Dispatch) => {
    return fetch(`http://localhost:5000/api/v1/borrows`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(borrow),
    })
      .then((resp) => resp.json())
      .then((borrow) => {
        dispatch(addBorrow(borrow))
      })
  }
}

export function fetchBorrows() {
  return (dispatch: Dispatch) => {
    return fetch(`http://localhost:5000/api/v1/books`)
      .then((resp) => resp.json())
      .then((books) => {
        dispatch(setBorrow(books))
      })
  }
}
