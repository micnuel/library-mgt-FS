import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { Icon } from 'semantic-ui-react'

import { Header } from '../components/header/header'

export default function Admin() {
  const history = useHistory()
  const data = [
    { id: 1, operation: 'Authors' },
    { id: 2, operation: 'Books' },
    { id: 3, operation: 'Users' },
  ]
  const handleClick = () => {
    data.map((p, index) => {
      if (data[index].operation === 'Authors') history.push('/add-author')
      if (data[index].operation === 'Books') history.push('/add-book')
      if (data[index].operation === 'Users') history.push('/register')
    })
  }
  const columns = [
    {
      name: 'Operations',
      selector: 'operation',
      sortable: true,
    },
    {
      name: 'Add',
      cell: (row: any) => (
        <div>
          <button onClick={handleClick}>
            {' '}
            <Icon name="plus circle" />
            Add
          </button>
        </div>
      ),
    },
    {
      name: 'Remove',
      cell: (row: any) => (
        <div>
          <button>
            <Icon name="trash" />
            Delete
          </button>
        </div>
      ),
    },
    {
      name: 'Update',
      cell: (row: any) => (
        <div>
          <button>
            <Icon name="pencil alternate" /> Update
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <Header />
      <DataTable
        title="Welcome Admin"
        columns={columns}
        data={data}
        striped={true}
      />
    </>
  )
}
