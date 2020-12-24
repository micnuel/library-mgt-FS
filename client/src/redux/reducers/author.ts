import {
  AuthorState,
  ADD_AUTHOR,
  AuthorActions,
  REMOVE_AUTHOR,
  UPDATE_AUTHOR,
  FETCH_AUTHORS,
} from '../../types'

export default function author(
  state: AuthorState = {
    authors: [],
    inTray: [],
    update: [],
  },
  action: AuthorActions
): AuthorState {
  switch (action.type) {
    case ADD_AUTHOR: {
      const { author } = action.payload
      return { ...state, inTray: [...state.inTray, author] }
    }
    case FETCH_AUTHORS: {
      const { authors } = action.payload
      return { ...state, authors: [...authors] }
    }
    case UPDATE_AUTHOR: {
      const { author } = action.payload
      return { ...state, update: [author] }
    }
    default:
      return state
  }
}
