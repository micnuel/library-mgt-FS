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
      const { borrow } = action.payload
      if (state.inTray.find((p) => p._id === borrow._id)) {
        return state
      }
      return { ...state, inTray: [...state.inTray, borrow] }
    }
    case FETCH_BORROW: {
      const { borrow } = action.payload
      return { ...state, borrow: [...borrow] }
    }

    case REMOVE_BORROW:
    case UPDATE_BORROW:

    default:
      return state
  }
}
