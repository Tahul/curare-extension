import { Button, InputField } from '@heetch/flamingo-react'
import {
  FieldValidationFunctionSync,
  ValidationSchema,
  Validators,
} from '@lemoncode/fonk'
import { createFinalFormValidation } from '@lemoncode/fonk-final-form'
import React from 'react'
import { Field, Form } from 'react-final-form'
import { useAuthDispatch, useAuthState } from '../../contexts/auth'
import { registerAction } from '../../contexts/auth/actions'
import { AuthActionPayload } from '../../contexts/auth/reducer'
import useActionsSounds from '../../hooks/useActionsSounds'

interface PasswordConfirmationPayload {
  password: string
  passwordConfirmation: string
}

const passwordConfirmationValidator: FieldValidationFunctionSync<PasswordConfirmationPayload> = ({
  value,
}) => {
  if (value.passwordConfirmation !== value.password) {
    return {
      type: 'PASSWORD_CONFIRMATION',
      succeeded: false,
      message:
        'The password confirmation must be the same as the password field.',
    }
  }

  return {
    type: 'PASSWORD_CONFIRMATION',
    succeeded: true,
    message: 'Validation succeeded',
  }
}

interface UserNameValidatorPayload {
  name: string
}

const userNameValidator: FieldValidationFunctionSync<UserNameValidatorPayload> = ({
  value,
}) => {
  if (/^[a-zA-Z0-9_]{1,15}$/.test(value.name)) {
    return {
      type: 'USERNAME_VALIDATION',
      succeeded: true,
      message: 'Validation succeeded',
    }
  }

  return {
    type: 'USERNAME_VALIDATION',
    succeeded: false,
    message: 'Your name must be alphanumeric',
  }
}

const validationSchema: ValidationSchema = {
  field: {
    name: [
      Validators.required.validator,
      {
        validator: Validators.minLength,
        customArgs: { length: 3 },
      },
      {
        validator: Validators.maxLength,
        customArgs: {
          length: 15,
        },
      },
      {
        // @ts-ignore
        validator: userNameValidator,
      },
    ],
    email: [Validators.required.validator, Validators.email.validator],
    password: [
      Validators.required.validator,
      {
        validator: Validators.minLength,
        customArgs: { length: 6 },
      },
    ],
    passwordConfirmation: [
      Validators.required.validator,
      {
        validator: Validators.minLength,
        customArgs: { length: 6 },
      },
      {
        // @ts-ignore
        validator: passwordConfirmationValidator,
      },
    ],
  },
}

const validator = createFinalFormValidation(validationSchema)

const defaultState =
  process.env.NODE_ENV === 'development'
    ? {
        name: process.env.DEV_USERNAME,
        email: process.env.DEV_EMAIL,
        password: process.env.DEV_PASSWORD,
        passwordConfirmation: process.env.DEV_PASSWORD,
      }
    : {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }

const RegisterForm = () => {
  const { playSuccess } = useActionsSounds()
  const { loading } = useAuthState()
  const authDispatch = useAuthDispatch()

  const initialValues = {
    ...defaultState,
  }

  const onSubmit = async ({
    name,
    email,
    password,
  }: Partial<AuthActionPayload>) => {
    await registerAction(authDispatch, {
      name,
      email,
      password,
    })

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
          <Field name="name">
            {({ input, meta }) => (
              <InputField
                helper={
                  meta.error && meta.touched
                    ? meta.error
                    : `Will be used as @${input.value || 'Username'}.`
                }
                invalid={!!(meta.error && meta.touched)}
                label="Username"
                id={input.name}
                disabled={loading}
                {...input}
              />
            )}
          </Field>

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
                autocomplete="new-password"
                {...input}
              />
            )}
          </Field>

          <Field name="passwordConfirmation" type="password">
            {({ input, meta }) => (
              <InputField
                helper={
                  meta.error && meta.touched ? meta.error : 'Your email address'
                }
                invalid={!!(meta.error && meta.touched)}
                label="Password confirmation"
                id={input.name}
                disabled={loading}
                {...input}
              />
            )}
          </Field>

          <Button isLoading={loading} style={{ width: '100%' }} type="submit">
            Register
          </Button>
        </form>
      )}
    ></Form>
  )
}

export default RegisterForm
