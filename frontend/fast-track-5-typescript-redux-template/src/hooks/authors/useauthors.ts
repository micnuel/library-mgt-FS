import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { AppState, Author } from '../../types'
import { fetchAuthors } from '../../redux/actions/author'

const useAuthors = () => {
  const [authorList, setAuthorList] = useState<Author[]>([])
  const authors = useSelector((state: AppState) => state.author.authors)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(dispatch(fetchAuthors()))
  }, [dispatch])

  return authors
}

export default useAuthors
