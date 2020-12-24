import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'semantic-ui-react'
import * as yup from 'yup'

import { createUser } from '../redux/actions/user'
import { AppState } from '../types'
import { Header } from '../components/header/header'

export function Register() {
  const dispatch = useDispatch()
  const [book, setBook] = useState([])

  const authors = useSelector((state: AppState) => state.author)

  return (
    <div>
      <Header />
      <h1>User Registration</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          role: 'normal',
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
          password: yup.string().required('Password is required'),
          passwordConfirmation: yup
            .string()
            .oneOf([yup.ref('password'), ''], 'Passwords must match'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          alert(JSON.stringify(values, null, 2))
          dispatch(createUser(values))
          resetForm()
          alert(JSON.stringify(values, null, 2))
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
            <Form.Group>
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
              <Form.Input
                placeholder="username"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.username}
                name="username"
              />
              {props.errors.username && (
                <div id="feedback">{props.errors.username}</div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Input
                placeholder="email"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                name="email"
              />
              {props.errors.email && (
                <div id="feedback">{props.errors.email}</div>
              )}
              <Form.Input
                placeholder="password"
                type="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                name="password"
              />
              {props.errors.password && (
                <div id="feedback">{props.errors.password}</div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Input
                placeholder="confirm password"
                type="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.passwordConfirmation}
                name="passwordConfirmation"
              />
              {props.errors.passwordConfirmation && (
                <div id="feedback">{props.errors.passwordConfirmation}</div>
              )}

              <Form.Button type="submit">Register</Form.Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </div>
  )
}
