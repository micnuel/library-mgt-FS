import React, { useState } from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Select } from '@material-ui/core'
import * as yup from 'yup'

import { createAuthor } from '../redux/actions/author'
import { AppState } from '../types'
import { userLogin } from '../redux/actions'
import { Header } from '../components/header/header'

export function Login() {
  const dispatch = useDispatch()
  const users = useSelector((state: AppState) => state.user)
  console.log(users)
  console.log(localStorage)
  return (
    <div>
      <Header />
      <h1>Login Page</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={yup.object({
          email: yup
            .string()
            .email('invalid email address')
            .required('required field'),
          password: yup
            .string()
            .max(45, 'must be 25 characters or less')
            .required('required field'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          alert(JSON.stringify(values, null, 2))
          dispatch(userLogin(values))
          resetForm()
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
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
            <Button type="submit">Login</Button>
          </form>
        )}
      </Formik>
    </div>
  )
}
