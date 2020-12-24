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
    update: [],
  },
  action: BookActions
): BookState {
  switch (action.type) {
    case ADD_BOOK: {
      const { book } = action.payload
      //localStorage.setItem('userBook', JSON.stringify(book))
      if (state.inTray.find((p) => p._id === book._id)) {
        return state
      }
      return { ...state, inTray: [...state.inTray, book] }
    }
    case FETCH_BOOKS: {
      const { books } = action.payload
      return { ...state, books: [...books] }
    }
    case UPDATE_BOOK: {
      const { book } = action.payload
      return { ...state, update: [book] }
    }
    case REMOVE_BOOK: {
      const { book } = action.payload
      const index = state.inTray.findIndex((p) => p._id == book._id)
      if (index >= 0) {
        state.inTray.splice(index, 1)
        return { ...state, inTray: [...state.inTray] }
      }
      return state
    }
    case UPDATE_BOOK:

    default:
      return state
  }
}
