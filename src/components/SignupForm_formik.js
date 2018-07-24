import React from 'react'
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'
import Button from './Button'


export const innerForm = ({
  values,
  errors,
  touched,
  isSubmitting
}) => (
    <Form>
      <div>
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field className="db w-100 pa2 mv3 ba b--black-20" type="text" placeholder="Name" name="name" />
      </div>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field className="db w-100 pa2 mv3 ba b--black-20" type="email" placeholder="Email" name="email" />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field className="db w-100 pa2 mv3 ba b--black-20" type="password" placeholder="Password" name="password" />
      </div>
      <label>
        <Field className="mr2" type="checkbox" name="newsletter" placeholder="newsletter" checked={values.newsletter} />
        Subscribe to our weekley newsletter
      </label>
      <div className="mv3">
        <Button disabled={isSubmitting}>Submit</Button>
      </div>
    </Form>
  )

const SignupForm = withFormik({
  mapPropsToValues({ name, email, password, newsletter, plan }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      newsletter: newsletter || false,
      plan: plan || 'free'
    }
  },
  validationSchema: yup.object().shape({
    email: yup.string().email('Email is not valid').required('Email is rquired'),
    password: yup.string().min(8, 'Password must be 8 characters or longer').required('Password is required')
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === 'nm1077@gmail.com') {
        setErrors({ email: 'That email is already taken.' })
      } else {
        resetForm()
      }
      setSubmitting(false)
    }, 1000)
  }
})(innerForm)

export default SignupForm