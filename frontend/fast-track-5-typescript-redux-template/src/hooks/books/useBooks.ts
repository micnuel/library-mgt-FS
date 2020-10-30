import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useMemo } from 'react'

import { AppState, Book } from '../../types'
import { fetchBooks } from '../../redux/actions/book'

const useBooks = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])
  const [booksList, setBooksList] = useState<Book[]>([])
  const books = useSelector((state: AppState) => state.book.books)

  return [books]
}

export default useBooks
