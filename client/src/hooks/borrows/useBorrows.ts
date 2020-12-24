import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useMemo } from 'react'

import { AppState, Borrow } from '../../types'
import { fetchUserBorrow } from '../../redux/actions/borrow'

const useBorrows = () => {
  const borrows = useSelector((state: AppState) => state.borrow.borrow)
  const [borrowsList, setBorrowsList] = useState<Borrow[]>([])
  const user = JSON.parse(localStorage.getItem('userInfo') as string)
    ? JSON.parse(localStorage.getItem('userInfo') as string).user['_id']
    : null
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserBorrow())
  }, [])
  /* useMemo(() => {
    setBorrowsList(searchBorrow(borrows))
  }, [borrows])
  function searchBorrow(userBorrows: Borrow[]) {
    return userBorrows
      ? userBorrows.filter((borrow: Borrow) =>
          borrow.borrowerId?.includes(user)
        )
      : []
  } */
  console.log(user)
  return [borrowsList]
}

export default useBorrows
