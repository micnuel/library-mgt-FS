import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import { AddAuthor } from './pages/Author'
import { AddBook } from './pages/Book'

import Product from './pages/Product'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/products/:id" component={Product} />
  </Switch>
)

export default Routes
