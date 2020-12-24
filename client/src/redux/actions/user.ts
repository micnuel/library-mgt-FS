import { Dispatch } from 'redux'

import { ADD_USER, User, UserActions, LOGIN, Login } from '../../types'

export function addUser(user: User): UserActions {
  return {
    type: ADD_USER,
    payload: {
      user,
    },
  }
}
//logging user in
export function login(user: User): UserActions {
  return {
    type: LOGIN,
    payload: {
      user,
    },
  }
}
// Async action processed by redux-thunk middleware
export function createUser(user: User) {
  return (dispatch: Dispatch) => {
    return fetch(`http://localhost:5000/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((user) => {
        dispatch(addUser(user))
      })
  }
}

export function userLogin(user: Login) {
  return (dispatch: Dispatch) => {
    return fetch(`http://localhost:5000/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        //authorization: '123',
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((user) => {
        dispatch(login(user))
      })
  }
}
