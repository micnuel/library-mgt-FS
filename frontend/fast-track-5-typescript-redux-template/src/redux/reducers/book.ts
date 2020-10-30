import {
  BookState,
  ADD_BOOK,
  BookActions,
  REMOVE_BOOK,
  UPDATE_BOOK,
  FETCH_BOOKS,
} from '../../types'

export default function book(
  state: BookState = {
    inTray: [],
    books: [],
  },
  action: BookActions
): BookState {
  switch (action.type) {
    case ADD_BOOK: {
      const { book } = action.payload
      if (state.inTray.find((p) => p._id === book._id)) {
        return state
      }
      return { ...state, inTray: [...state.inTray, book] }
    }
    case FETCH_BOOKS: {
      const { books } = action.payload
      return { ...state, books: [...books] }
    }

    case REMOVE_BOOK:
    case UPDATE_BOOK:

    default:
      return state
  }
}
