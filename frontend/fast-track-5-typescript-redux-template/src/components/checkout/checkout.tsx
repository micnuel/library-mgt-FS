import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, List, Icon } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'

import { removeBook } from '../../redux/actions/book'
import { createBorrow, fetchUserBorrow } from '../../redux/actions/borrow'

import { AppState } from '../../types'

function Checkout() {
  const dispatch = useDispatch()
  const books = useSelector((state: AppState) => state.book.inTray)
  const history = useHistory()
  const handleBorrow = () => {
    console.log(dispatch(createBorrow(books)))
    history.push('/')
    books.length = 0
    alert('Confirm to borrow books')
  }
  return (
    <>
      <h4> List of Books to Borrow</h4>
      {books.length <= 0 && (
        <div>
          <h4>No Book(s) in cart</h4>
        </div>
      )}
      <Link to="/">
        {' '}
        <Icon name="angle double left" size="huge" textAlign="center" />
      </Link>
      {books.map((p) => (
        <List divided key={p._id} className="content">
          <List.Item className="content__items">
            <List.Content floated="right">
              <Button onClick={() => dispatch(removeBook(p))}>Remove</Button>
            </List.Content>
            <Icon name="book" />
            <List.Content>{p.name}</List.Content>
          </List.Item>
        </List>
      ))}
      <Button onClick={handleBorrow}>Borrow</Button>
    </>
  )
}

export default Checkout
