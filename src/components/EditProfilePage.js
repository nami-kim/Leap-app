import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'
import Button from './Button'
import { ContainerForm } from './Container'
import { startUpdateUser } from '../actions/users'
import ProfilePhoto from './ProfilePhoto'

export const innerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  isSubmitting,
}) => (
    <ContainerForm>
      <h1>Account</h1>
      <ProfilePhoto />
      <Form onSubmit={handleSubmit}>
        <h4 className="ma0">Name</h4>
        <Field
          className="f6 dark-gray db w-100 pa2 mt1 mb3 ba b--black-20"
          type="text"
          name="name"
          onChange={handleChange}
        />
        {touched.name && errors.name && <p className='f6 i red'>{errors.name}</p>}
        <h4 className="ma0">Email</h4>
        <Field
          className="f6 dark-gray db w-100 pa2 mt1 mb3 ba b--black-20"
          type="email"
          name="email"
          onChange={handleChange}
        />
        {touched.email && errors.email && <p className='f6 i red'>{errors.email}</p>}
        <h4 className="ma0">About</h4>
        <Field
          className="f6 dark-gray db w-100 pv4 ph2 mt1 mb3 ba b--black-20"
          type="text"
          name="about"
          onChange={handleChange}
        />
        <h4 className="ma0">Company</h4>
        <Field
          className="f6 dark-gray db w-100 pa2 mt1 mb3 ba b--black-20"
          type="text"
          name="company"
          onChange={handleChange}
        />
        <h4 className="ma0">Job Title</h4>
        <Field
          className="f6 dark-gray db w-100 pa2 mt1 mb3 ba b--black-20"
          type="text"
          name="jobtitle"
          onChange={handleChange}
        />
        <h4 className="ma0">Linkedin</h4>
        <Field
          className="f6 dark-gray db w-100 pa2 mt1 mb3 ba b--black-20"
          type="text"
          placeholder="https://www.linkedin.com/in/your-handle"
          name="linkedin"
          onChange={handleChange}
        />
        <h4 className="ma0">Facebook</h4>
        <Field
          className="f6 dark-gray db w-100 pa2 mt1 mb3 ba b--black-20"
          type="text"
          placeholder="https://www.facebook.com/your-handle"
          name="facebook"
          onChange={handleChange}
        />
        <label>
          <Field
            className="f6 mv2 mr2"
            type="checkbox"
            name="newsletter"
            placeholder="newsletter"
            checked={values.newsletter}
            onChange={handleChange}
          />
          Subscribe to our weekley newsletter
        </label>
        <div className="mv3">
          <Button disabled={isSubmitting}>Save</Button>
        </div>
      </Form>

      <div className="tl mt2 mb3">
        <Link
          to="/PasswordForgotPage"
          className="f7 fw2 gray"
        >
          Forgot your password?
            </Link>
      </div>
    </ContainerForm>
  )

// Wrap our form with the using withFormik HoC

const ProfileForm = withFormik({
  // Transform outer props into form values
  enableReinitialize: true,

  mapPropsToValues: ({
    name = '',
    email = '',
    about = '',
    company = '',
    jobtitle = '',
    linkedin = '',
    facebook = '',
    newsletter = false,
    currentUser = {}
  }) => {
    console.log(currentUser)
    return {
      name: currentUser.name ? currentUser.name : name,
      email: currentUser.email ? currentUser.email : email,
      about: currentUser.about ? currentUser.about : about,
      company: currentUser.company ? currentUser.company : company,
      jobtitle: currentUser.jobtitle ? currentUser.jobtitle : jobtitle,
      linkedin: currentUser.linkedin ? currentUser.linkedin : linkedin,
      facebook: currentUser.facebook ? currentUser.facebook : facebook,
      newsletter: currentUser.newsletter ? currentUser.newsletter : newsletter,
    }
  },
  validationSchema: yup.object().shape({
    email: yup.string().email('Email is not valid').required('Email is rquired'),
    name: yup.string().required('Name is required')
  }),
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    if (values.email !== props.currentUser.email && props.users.find((user) => {
      return user.email === values.email
    })) {
      setErrors({ email: 'That email is already taken.' })
      setSubmitting(false)
    } else {
      props.startUpdateUser(values)
        .then(() => {
          console.log('Account has been updated')
          resetForm()
        })
        .catch(err => {
          setErrors('Something went wrong')
        })
        .finally(() => setSubmitting(false))
    }
  }
})(innerForm)

const mapStateToProps = (state) => ({
  users: state.users,
  currentUser: state.users.find((user) => {
    return user.uid === state.authUser.uid
  })
})

const mapDispatchToProps = (dispatch) => ({
  startUpdateUser: (updates) => dispatch(startUpdateUser(updates))
})
const EditProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfileForm)

export default EditProfilePage



