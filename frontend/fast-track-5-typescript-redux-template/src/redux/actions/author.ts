import { Dispatch } from 'redux'

import {
  ADD_AUTHOR,
  Author,
  AuthorActions,
  FETCH_AUTHORS,
  UPDATE_AUTHOR,
} from '../../types'

export function addAuthor(author: Author): AuthorActions {
  return {
    type: ADD_AUTHOR,
    payload: {
      author,
    },
  }
}
export function updateAuthor(author: Author): AuthorActions {
  return {
    type: UPDATE_AUTHOR,
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
        authorization: `${author.token}`,
      },
      body: JSON.stringify(author),
    })
      .then((resp) => resp.json())
      .then((author) => {
        dispatch(addAuthor(author))
      })
  }
}
export function setAuthors(authors: Author[]): AuthorActions {
  return {
    type: FETCH_AUTHORS,
    payload: {
      authors,
    },
  }
}
export function fetchAuthorUpdate(update: Partial<Author>, authorId?: string) {
  return (dispatch: Dispatch) => {
    return fetch(`http://localhost:5000/api/v1/authors/${authorId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(update),
    })
      .then((resp) => resp.json())
      .then((authors) => {
        dispatch(updateAuthor(authors))
      })
  }
}

export function fetchAuthors() {
  return (dispatch: Dispatch) => {
    return fetch(`http://localhost:5000/api/v1/authors`)
      .then((resp) => resp.json())
      .then((authors) => {
        dispatch(setAuthors(authors))
      })
  }
}
