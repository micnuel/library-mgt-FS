import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Select } from '@material-ui/core'
import * as yup from 'yup'

import { createUser } from '../redux/actions/user'
import { AppState } from '../types'

export function Register() {
  const dispatch = useDispatch()
  const [book, setBook] = useState([])

  const authors = useSelector((state: AppState) => state.author)

  return (
    <div>
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
              <TextField
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
            </div>
            <div>
              <TextField
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
            </div>
            <div>
              <TextField
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
            </div>
            <div>
              <TextField
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
            </div>

            <Button type="submit">Submit</Button>
          </form>
        )}
      </Formik>
    </div>
  )
}
