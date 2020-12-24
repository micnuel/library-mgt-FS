import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { Input, Menu, Icon, Button } from 'semantic-ui-react'
import { AppState } from '../../types'
import { DropDown } from '../dropdown/dropdown'

export const Header = () => {
  const history = useHistory()
  const handleLogin = () => {
    history.push('/login')
  }
  const handleRegister = () => {
    history.push('/register')
  }
  const borrowed = useSelector((state: AppState) => state.book.inTray)
  console.log(borrowed)
  //const token = JSON.parse(localStorage.getItem('userInfo') as string).user['email']
  const user = JSON.parse(localStorage.getItem('userInfo') as string)
    ? JSON.parse(localStorage.getItem('userInfo') as string).user
    : null

  return (
    <Menu secondary>
      <Link to="/">
        <Menu.Item name="BK Library" />
      </Link>

      <Menu.Menu position="left">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
      </Menu.Menu>

      <Menu.Menu position="right">
        {!user && <Menu.Item name="login" onClick={handleLogin} />}
        {!user && <Menu.Item name="register" onClick={handleRegister} />}
        {user && (
          <>
            <Button onClick={(e) => history.push('/checkout')}>
              <Icon name="shopping cart" /> {borrowed.length}
            </Button>
            <DropDown />
          </>
        )}
      </Menu.Menu>
    </Menu>
  )
}
