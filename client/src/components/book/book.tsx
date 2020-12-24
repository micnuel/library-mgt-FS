import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, Icon } from 'semantic-ui-react'
import { AppState } from '../../types'
import { useParams } from 'react-router-dom'

const extra = (
  <Link to="/">
    <Icon name="angle double left" />
  </Link>
)

export function Book() {
  const { id } = useParams()
  const book = useSelector((state: AppState) =>
    state.book.books.find((p) => p._id === id)
  )
  return (
    <Card
      style={{
        width: '50%',
        marginLeft: '25%',
      }}
      image="../../cover.jpg"
      header={book?.name}
      meta={book?.isbn}
      description={book?.description}
      extra={extra}
    />
  )
}
