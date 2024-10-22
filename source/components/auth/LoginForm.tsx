import { Button, InputField } from '@heetch/flamingo-react'
import { ValidationSchema, Validators } from '@lemoncode/fonk'
import { createFinalFormValidation } from '@lemoncode/fonk-final-form'
import React from 'react'
import { Field, Form } from 'react-final-form'
import { useAuthDispatch, useAuthState } from '../../contexts/auth'
import { loginAction } from '../../contexts/auth/actions'
import { AuthActionPayload } from '../../contexts/auth/reducer'
import useActionsSounds from '../../hooks/useActionsSounds'

const validationSchema: ValidationSchema = {
  field: {
    email: [Validators.required.validator, Validators.email.validator],
    password: [
      Validators.required.validator,
      {
        validator: Validators.minLength,
        customArgs: { length: 6 },
      },
    ],
  },
}

const validator = createFinalFormValidation(validationSchema)

const defaultState =
  process.env.NODE_ENV === 'development'
    ? {
        email: process.env.DEV_EMAIL,
        password: process.env.DEV_PASSWORD,
      }
    : {
        email: '',
        password: '',
      }

const LoginForm = () => {
  const { playSuccess } = useActionsSounds()
  const { loading } = useAuthState()
  const authDispatch = useAuthDispatch()

  const initialValues = {
    ...defaultState,
  }

  const onSubmit = async (payload: Partial<AuthActionPayload>) => {
    await loginAction(authDispatch, payload)

    playSuccess()
  }

  const validate = (values: Partial<AuthActionPayload>) =>
    validator.validateForm(values)

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="email">
            {({ input, meta }) => (
              <InputField
                helper={
                  meta.error && meta.touched ? meta.error : 'Your email address'
                }
                invalid={!!(meta.error && meta.touched)}
                label="Email"
                id={input.name}
                disabled={loading}
                {...input}
              />
            )}
          </Field>

          <Field name="password" type="password">
            {({ input, meta }) => (
              <InputField
                helper={
                  meta.error && meta.touched ? meta.error : 'Your password'
                }
                invalid={!!(meta.error && meta.touched)}
                label="Password"
                id={input.name}
                disabled={loading}
                {...input}
              />
            )}
          </Field>
          <Button isLoading={loading} style={{ width: '100%' }} type="submit">
            Login
          </Button>
        </form>
      )}
    />
  )
}

export default LoginForm
