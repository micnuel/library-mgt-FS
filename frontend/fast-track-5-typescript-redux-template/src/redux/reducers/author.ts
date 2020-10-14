import {
  AuthorState,
  ADD_AUTHOR,
  AuthorActions,
  REMOVE_AUTHOR,
  UPDATE_AUTHOR,
} from '../../types'

export default function author(
  state: AuthorState = {
    authors: [],
    inTray: [],
  },
  action: AuthorActions
): AuthorState {
  switch (action.type) {
    case ADD_AUTHOR: {
      const { author } = action.payload
      return { ...state, inTray: [...state.inTray, author] }
    }
    case REMOVE_AUTHOR:
    case UPDATE_AUTHOR:
    default:
      return state
  }
}
