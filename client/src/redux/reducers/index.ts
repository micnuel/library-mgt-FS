import { combineReducers } from 'redux'

import author from './author'
import book from './book'
import user from './user'
import borrow from './borrow'

const createRootReducer = () =>
  combineReducers({
    author,
    book,
    user,
    borrow,
  })

export default createRootReducer
