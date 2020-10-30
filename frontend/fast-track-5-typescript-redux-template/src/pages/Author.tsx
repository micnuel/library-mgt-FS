import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Select } from '@material-ui/core'
import * as yup from 'yup'

import { createAuthor } from '../redux/actions/author'
import { fetchBooks } from '../redux/actions/book'
import { AppState } from '../types'

export function AddAuthor() {
  const dispatch = useDispatch()
  const [book, setBook] = useState([])

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  const authors = useSelector((state: AppState) => state.author)
  console.log(authors)
  const books = useSelector((state: AppState) => state.book)
  //const token = JSON.parse(localStorage.getItem('userInfo') as string).user['email']
  const token = JSON.parse(localStorage.getItem('userInfo') as string)

  // check for status code 403 (and when user is not logged as admin)
  setTimeout(() => console.log(token), 2000)
  return (
    <div>
      <h1>Add An Author</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          token: `${
            JSON.parse(localStorage.getItem('userInfo') as string).token
          }`,
          books: [],
        }}
        validationSchema={yup.object({
          firstName: yup
            .string()
            .min(3, 'must be at least 3 character')
            .max(25, 'must be 25 characters or less')
            .required('required field'),
          lastName: yup
            .string()
            .min(3, 'must be at least 3 character')
            .max(25, 'must be 25 characters or less')
            .required('required field'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          alert(JSON.stringify(values, null, 2))
          dispatch(createAuthor(values))
          resetForm()
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div>
              <TextField
                placeholder="firstName"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.firstName}
                name="firstName"
              />
              {props.errors.firstName && (
                <div id="feedback">{props.errors.firstName}</div>
              )}
            </div>
            <div>
              <TextField
                placeholder="lastName"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.lastName}
                name="lastName"
              />
              {props.errors.lastName && (
                <div id="feedback">{props.errors.lastName}</div>
              )}
            </div>
            <div>
              <Select
                native
                multiple
                onChange={props.handleChange}
                label="books"
                value={props.values.books}
                name="books"
                inputProps={{
                  name: 'books',
                }}
              >
                {books.books.map((book) => {
                  return (
                    <option key={book._id} value={book._id}>
                      {book.name}
                    </option>
                  )
                })}
              </Select>
            </div>

            <Button type="submit">Submit</Button>
          </form>
        )}
      </Formik>
    </div>
  )
}
