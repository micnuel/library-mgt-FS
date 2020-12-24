import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'semantic-ui-react'
import * as yup from 'yup'

import { createBook } from '../redux/actions/book'
import { AppState } from '../types'
import { Header } from '../components/header/header'

export function AddBook() {
  const options = [
    { key: 'm', text: 'Programming', value: 'Programming' },
    { key: 'f', text: 'Science', value: 'Science' },
    { key: 'o', text: 'Other', value: 'other' },
  ]
  const history = useHistory()
  const dispatch = useDispatch()
  const [book, setBook] = useState([])

  const authors = useSelector((state: AppState) => state.author)

  return (
    <div>
      <Header />
      <h1>Add A Book</h1>
      <Formik
        initialValues={{
          name: '',
          isbn: '',
          category: [],
          publisher: '',
          description: '',
          status: 'available',
          author: [],
          publishedYear: 0,
        }}
        validationSchema={yup.object({
          name: yup
            .string()
            .max(25, 'must be 25 characters or less')
            .required('required field'),
          isbn: yup.number().required('required field'),
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
          JSON.stringify(values, null, 2)
          dispatch(createBook(values))
          history.push('/admin')
          resetForm()
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Form.Group>
              <Form.Input
                placeholder="name"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
              />
              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}
              <Form.Input
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
            </Form.Group>
            <Form.Group>
              <Form.Input
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
              <Form.Input
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
            </Form.Group>
            <Form.Group>
              <Form.Field
                control="select"
                multiple
                onChange={props.handleChange}
                label="Authors"
                value={props.values.author}
                name="author"
              >
                {authors.authors.map((author) => {
                  console.log(authors)
                  return (
                    <option key={author._id} value={author._id}>
                      {author.firstName}
                    </option>
                  )
                })}
              </Form.Field>
              <Form.Field
                onChange={props.handleChange}
                control="select"
                name="category"
                label="Category"
                placeholder="Category"
                value={props.values.category}
              >
                {options.map((cat) => {
                  return (
                    <option key={cat.key} value={cat.key}>
                      {cat.text}
                    </option>
                  )
                })}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Input
                placeholder="published Year"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.publishedYear}
                name="publishedYear"
              />
              {props.errors.publishedYear && (
                <div id="feedback">{props.errors.publishedYear}</div>
              )}
              <Form.Button type="submit">Submit</Form.Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </div>
  )
}
