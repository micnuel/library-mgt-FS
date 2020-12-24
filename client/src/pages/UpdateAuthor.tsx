import React from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'

import { Header } from '../components/header/header'
import { AppState } from '../types'
import { fetchAuthorUpdate } from '../redux/actions/author'

export function UpdateAuthor() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const token = JSON.parse(localStorage.getItem('userInfo') as string)
  const author = useSelector((state: AppState) => state.author.update)

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
          alert(JSON.stringify(values, null, 2))
          dispatch(fetchAuthorUpdate(values, id))
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
