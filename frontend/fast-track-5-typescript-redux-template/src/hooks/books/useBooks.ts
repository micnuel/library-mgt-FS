import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useMemo } from 'react'

import { AppState, Book } from '../../types'
import { fetchBooks } from '../../redux/actions/book'

const useBooks = () => {
  const [booksList, setBooksList] = useState<Book[]>([])
  const books = useSelector((state: AppState) => state.book.books)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  return [books]
}

export default useBooks
