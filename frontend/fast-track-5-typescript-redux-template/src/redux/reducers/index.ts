import { combineReducers } from 'redux'

import product from './product'
import ui from './ui'
import author from './author'
import book from './book'

const createRootReducer = () =>
  combineReducers({
    product,
    ui,
    author,
    book,
  })

export default createRootReducer
