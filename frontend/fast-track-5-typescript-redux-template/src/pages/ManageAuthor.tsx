import React from 'react'
import { useDispatch } from 'react-redux'
import DataTable from 'react-data-table-component'
import { Icon } from 'semantic-ui-react'
import { useHistory, Link } from 'react-router-dom'

import { updateBook, deleteBook } from '../redux/actions/book'
import { Header } from '../components/header/header'
import useAuthors from '../hooks/authors/useauthors'

export default function ManageAuthors() {
  const dispatch = useDispatch()
  const history = useHistory()
  const authors = useAuthors()
  console.log(authors)
  const tableHeader = [
    {
      name: 'FirstName',
      selector: 'firstName',
      sortable: true,
    },
    {
      name: 'Remove',
      cell: (row: any) => (
        <div>
          <button
            onClick={() => {
              console.log(dispatch(deleteBook(row._id)))
              history.push('/')
            }}
          >
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
          <Link to={`/update-author/${row._id}`}>
            <button
              onClick={() => {
                console.log(dispatch(updateBook(row)))
              }}
            >
              <Icon name="pencil alternate" /> Update
            </button>
          </Link>
        </div>
      ),
    },
    {
      name: 'Add',
      cell: (row: any) => (
        <div>
          <button onClick={() => history.push('/add-author')}>
            <Icon name="plus circle" />
            Add
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <Header />
      {
        <DataTable
          title="List of Books"
          columns={tableHeader}
          data={authors}
          striped={true}
          noDataComponent={<h2>LOADING.../No Data</h2>}
        />
      }
    </>
  )
}
