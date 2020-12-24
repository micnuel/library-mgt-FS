import React from 'react'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { Form } from 'semantic-ui-react'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'

import { userLogin } from '../redux/actions/user'

export function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('userInfo') as string)
    ? JSON.parse(localStorage.getItem('userInfo') as string).user['role']
    : ''
  const handleLogin = () => {
    if (user === 'admin') return history.push('/admin')
    if (user === 'normal') return history.push('/borrowed')
  }
  return (
    <div>
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
          JSON.stringify(values, null, 2)
          dispatch(userLogin(values))
          resetForm()
          handleLogin()
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Form.Group widths="equal">
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

            <Form.Button type="submit">Login</Form.Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
