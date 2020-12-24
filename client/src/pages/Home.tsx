import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import { columns } from '../components/columns/columns'
import { AppState } from '../types'
import { addBook } from '../redux/actions/book'
import { Header } from '../components/header/header'
import useBooks from '../hooks/books/useBooks'

export default function Home() {
  const dispatch = useDispatch()
  const [books] = useBooks()
  const book = useSelector((state: AppState) => state.book)
  console.log(book)
  const tableHeader = [
    ...columns,
    {
      name: 'Borrow',
      cell: (row: any) => (
        <div>
          <button
            disabled={book.inTray.find((p) => p._id === row._id) ? true : false}
            onClick={() => {
              row.status = 'borrowed'
              console.log(dispatch(addBook(row)))
            }}
          >
            Borrow
          </button>
        </div>
      ),
    },
    {
      name: 'More...',
      cell: (row: any) => (
        <div>
          <Link to={`/book/${row._id}`}>
            <Icon name="eye" size="large" />
          </Link>
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
          /*           pagination={true}
           */
        />
      }
    </>
  )
}
