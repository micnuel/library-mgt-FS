import {
  BorrowState,
  ADD_BORROW,
  BorrowActions,
  REMOVE_BORROW,
  UPDATE_BORROW,
  FETCH_BORROW,
} from '../../types'

export default function borrow(
  state: BorrowState = {
    inTray: [],
    borrow: [],
  },
  action: BorrowActions
): BorrowState {
  switch (action.type) {
    case ADD_BORROW: {
      const { bookId } = action.payload
      if (state.inTray.find((p) => p._id === bookId._id)) {
        return state
      }
      return { ...state, inTray: [...state.inTray, bookId] }
    }
    case FETCH_BORROW: {
      const { borrow } = action.payload
      return { ...state, borrow: [...borrow] }
    }

    case REMOVE_BORROW: {
      //deletes all books...hard to access books!
      const { bookId } = action.payload
      const index = state.borrow.findIndex((p) => p._id === bookId._id)
      if (index >= 0) {
        state.borrow.splice(index, 1)
        return { ...state, borrow: [...state.borrow] }
      }
      return state
    }
    case UPDATE_BORROW:

    default:
      return state
  }
}
