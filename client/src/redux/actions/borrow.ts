import { Dispatch } from 'redux'

import {
  ADD_BORROW,
  Borrow,
  Book,
  BorrowActions,
  FETCH_BORROW,
  REMOVE_BORROW,
} from '../../types'

export function addBorrow(bookId: Borrow): BorrowActions {
  return {
    type: ADD_BORROW,
    payload: {
      bookId,
    },
  }
}
export function removeBorrow(bookId: Borrow): BorrowActions {
  return {
    type: REMOVE_BORROW,
    payload: {
      bookId,
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
const user = JSON.parse(localStorage.getItem('userInfo') as string)
  ? JSON.parse(localStorage.getItem('userInfo') as string).user['_id']
  : null
// Async action processed by redux-thunk middleware
export function createBorrow(bookId: any, borrowerId: any = user) {
  return (dispatch: Dispatch) => {
    return fetch(`https://salty-atoll-28842.herokuapp.com/api/v1/borrows`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ bookId, borrowerId }),
    }).then((resp) => resp.json())
  }
}

export function borrowBook(borrow: Borrow) {
  return (dispatch: Dispatch) => {
    return fetch(`https://salty-atoll-28842.herokuapp.com/api/v1/borrows`, {
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
export function fetchUserBorrow() {
  return (dispatch: Dispatch) => {
    return fetch(
      `https://salty-atoll-28842.herokuapp.com/api/v1/borrows/${user}`
    )
      .then((resp) => resp.json())
      .then((borrows) => {
        dispatch(setBorrow(borrows))
      })
  }
}
