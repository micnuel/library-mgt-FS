import React from 'react'
import { useHistory } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'

export const DropDown = () => {
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('userInfo') as string)
  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    history.push('/')
  }
  const handleBorrowed = () => {
    history.push('/borrowed')
  }
  return (
    <>
      <Dropdown
        text={user.user['firstName']}
        icon="user"
        floating
        labeled
        button
        className="icon"
      >
        <Dropdown.Menu>
          {user.user['role'] === 'admin' && (
            <Dropdown.Item onClick={() => history.push('/admin')}>
              Manage Books
            </Dropdown.Item>
          )}
          {user.user['role'] === 'admin' && (
            <Dropdown.Item onClick={() => history.push('/admin/author')}>
              Manage Authors
            </Dropdown.Item>
          )}
          {user.user['role'] === 'admin' && (
            <Dropdown.Item>Manage Users</Dropdown.Item>
          )}
          <Dropdown.Item onClick={handleBorrowed}> Borrowed</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
