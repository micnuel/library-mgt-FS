import {
  UserState,
  ADD_USER,
  UserActions,
  REMOVE_USER,
  UPDATE_USER,
  LOGIN,
} from '../../types'

export default function user(
  state: UserState = {
    users: [],
    inTray: [],
    user: undefined,
    update: [],
  },
  action: UserActions
): UserState {
  switch (action.type) {
    case ADD_USER: {
      const { user } = action.payload
      return { ...state, inTray: [...state.inTray, user] }
    }

    case LOGIN: {
      const { user } = action.payload
      localStorage.setItem('userInfo', JSON.stringify(user))
      return { ...state, user: user }
    }
    case REMOVE_USER:
    case UPDATE_USER:
    default:
      return state
  }
}
