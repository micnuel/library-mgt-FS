import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import { AddAuthor } from './pages/Author'
import { AddBook } from './pages/Book'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import SingleBook from './pages/SingleBook'
import Borrows from './pages/Borrow'
import Admin from './pages/Admin'
import ManageBooks from './pages/ManageBook'
import ManageAuthors from './pages/ManageAuthor'
import { UpdateBook } from './pages/UpdateBook'
import { UpdateAuthor } from './pages/UpdateAuthor'
import Checkout from './components/checkout/checkout'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/admin" component={ManageBooks} />
    <Route exact path="/admin/author" component={ManageAuthors} />
    <Route exact path="/book/:id" component={SingleBook} />
    <Route exact path="/checkout" component={Checkout} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/borrowed" component={Borrows} />
    <Route exact path="/add-author" component={AddAuthor} />
    <Route exact path="/add-user" component={Register} />
    <Route exact path="/add-book" component={AddBook} />
    <Route exact path="/ad" component={Admin} />
    <Route exact path="/update-book/:id" component={UpdateBook} />
    <Route exact path="/update-author/:id" component={UpdateAuthor} />
  </Switch>
)

export default Routes
