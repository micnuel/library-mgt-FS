import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import { columns } from '../components/columns/columns'
import { AppState } from '../types'
import { createBorrow, addBorrow, removeBorrow } from '../redux/actions/borrow'
import { addBook, removeBook } from '../redux/actions/book'
import { Header } from '../components/header/header'
import useBorrows from '../hooks/borrows/useBorrows'

export default function Borrows() {
  const dispatch = useDispatch()
  const [borrows] = useBorrows()

  const borrow = useSelector((state: AppState) => state.borrow)
  const books = useSelector((state: AppState) => state.book)

  console.log(books)
  const uBorrow: any = []
  borrow.borrow.map((p) => {
    uBorrow.push(p.bookId)
  })
  console.log(borrow)
  console.log(uBorrow)
  const tableHeader = [
    ...columns,
    {
      name: 'Borrow',
      cell: (row: any) => (
        <div>
          {borrows && (
            <button
              onClick={() => {
                console.log(dispatch(removeBorrow(row.id)))
              }}
            >
              Return
            </button>
          )}
        </div>
      ),
    },
  ]

  return (
    <>
      <Header />
      {
        <DataTable
          title="List of Borrowed Books"
          columns={tableHeader}
          data={uBorrow[0]}
          striped={true}
          noDataComponent={<h2>LOADING.../No Data</h2>}
        />
      }
    </>
  )
}
