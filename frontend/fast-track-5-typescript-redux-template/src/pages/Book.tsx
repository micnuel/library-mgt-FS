import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import * as yup from 'yup'

import { createBook, fetchBooks } from '../redux/actions/book'
import { AppState, BookState, Book } from '../types'

export function AddBook() {
  const dispatch = useDispatch()
  const [book, setBook] = useState([])

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  const authors = useSelector((state: AppState) => state.author.inTray)
  console.log(authors)
  const books = useSelector((state: BookState) => state.books)
  console.log(books)

  return (
    <div>
      <h1>Add An Author</h1>
      <Formik
        initialValues={{
          name: '',
          isbn: '',
          category: [],
          publisher: '',
          description: '',
          status: 'available',
          authors: [],
          publishedYear: 0,
        }}
        validationSchema={yup.object({
          name: yup
            .string()
            .max(25, 'must be 25 characters or less')
            .required('required field'),
          isbn: yup
            .string()
            .max(25, 'must be 25 characters or less')
            .required('required field'),
          publisher: yup
            .string()
            .max(25, 'must be 25 characters or less')
            .required('required field'),
          description: yup
            .string()
            .max(55, 'must be 55 characters or less')
            .required('required field'),
          publishedYear: yup.number().required('required field'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          alert(JSON.stringify(values, null, 2))
          dispatch(createBook(values))
          resetForm()
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div>
              <TextField
                placeholder="name"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="isbn"
              />
              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}
            </div>
            <div>
              <TextField
                placeholder="isbn"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.isbn}
                name="isbn"
              />
              {props.errors.isbn && (
                <div id="feedback">{props.errors.isbn}</div>
              )}
              <TextField
                placeholder="publisher"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.publisher}
                name="publisher"
              />
              {props.errors.publisher && (
                <div id="feedback">{props.errors.publisher}</div>
              )}
              <TextField
                placeholder="description"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.description}
                name="description"
              />
              {props.errors.publisher && (
                <div id="feedback">{props.errors.description}</div>
              )}
              <TextField
                placeholder="publishedYear"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.publishedYear}
                name="publishedYear"
              />
              {props.errors.publishedYear && (
                <div id="feedback">{props.errors.publishedYear}</div>
              )}
            </div>
            <Button type="submit">Submit</Button>
          </form>
        )}
      </Formik>
    </div>
  )
}
