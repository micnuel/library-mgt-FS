import React from 'react'
import { Input, Menu } from 'semantic-ui-react'

export const Header = () => {
  return (
    <Menu secondary>
      <Menu.Item name="BK Library" />

      <Menu.Menu position="left">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
      </Menu.Menu>

      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={(e) => {}} />
      </Menu.Menu>
    </Menu>
  )
}
