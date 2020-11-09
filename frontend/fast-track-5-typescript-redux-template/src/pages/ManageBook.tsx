import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { Icon } from 'semantic-ui-react'
import { useHistory, Link } from 'react-router-dom'

import { AppState } from '../types'
import { updateBook, deleteBook } from '../redux/actions/book'
import { Header } from '../components/header/header'
import useBooks from '../hooks/books/useBooks'

export default function ManageBooks() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [books] = useBooks()
  const book = useSelector((state: AppState) => state.book)
  console.log(book)
  const tableHeader = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Remove',
      cell: (row: any) => (
        <div>
          <button
            onClick={() => {
              dispatch(deleteBook(row._id))
              history.push('/admin')
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
          <Link to={`/update-book/${row._id}`}>
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
          <button onClick={() => history.push('/add-book')}>
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
          data={books}
          striped={true}
          noDataComponent={<h2>LOADING.../No Data</h2>}
        />
      }
    </>
  )
}
