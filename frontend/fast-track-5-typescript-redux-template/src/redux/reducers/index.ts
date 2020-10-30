import { combineReducers } from 'redux'

import product from './product'
import ui from './ui'
import author from './author'
import book from './book'
import user from './user'
import borrow from './borrow'

const createRootReducer = () =>
  combineReducers({
    product,
    ui,
    author,
    book,
    user,
    borrow,
  })

export default createRootReducer
