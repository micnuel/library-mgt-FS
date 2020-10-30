import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import { columns } from '../components/columns/columns'
import { AppState } from '../types'
import { fetchBooks } from '../redux/actions/book'
import { Header } from '../components/header/header'
import useBooks from '../hooks/books/useBooks'

export default function Home() {
  const [books] = useBooks()
  const user = useSelector((state: AppState) => state.book)
  console.log(user)
  const tableHeader = [
    ...columns,
    {
      name: 'Borrow',
      cell: (row: any) => (
        <div>
          <button
            disabled={
              false
              //countriesInCart.find((p) => p.id === row.id) ? true : false
            }
            //onClick={() => dispatch((countries[row.id]))}
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
          <Link to={`/country/${row.id}`}>
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
