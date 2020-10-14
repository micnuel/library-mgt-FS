import { Dispatch } from 'redux'

import { ADD_AUTHOR, Author, AuthorActions } from '../../types'

export function addAuthor(author: Author): AuthorActions {
  return {
    type: ADD_AUTHOR,
    payload: {
      author,
    },
  }
}
// Async action processed by redux-thunk middleware
export function createAuthor(author: Author) {
  return (dispatch: Dispatch) => {
    return fetch(`http://localhost:5000/api/v1/authors`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(author),
    })
      .then((resp) => resp.json())
      .then((author) => {
        dispatch(addAuthor(author))
      })
  }
}
