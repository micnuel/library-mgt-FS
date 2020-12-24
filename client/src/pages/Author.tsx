import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { Form } from 'semantic-ui-react'
import * as yup from 'yup'

import { createAuthor } from '../redux/actions/author'
import { Header } from '../components/header/header'

export function AddAuthor() {
  const dispatch = useDispatch()
  const [book, setBook] = useState([])
  const token = JSON.parse(localStorage.getItem('userInfo') as string)

  // check for status code 403 (and when user is not logged as admin)
  setTimeout(() => console.log(token), 2000)
  return (
    <div>
      <Header />
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
          JSON.stringify(values, null, 2)
          dispatch(createAuthor(values))
          resetForm()
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Form.Group>
              <Form.Input
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
              <Form.Input
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
            </Form.Group>

            <Form.Button type="submit">Submit</Form.Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
