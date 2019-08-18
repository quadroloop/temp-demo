import React from 'react'
import { Formik } from 'formik'

function AccessibleForm(props) {
  const {
    component: Component,
    initialValues,
    onSubmit,
    onChange,
  } = props

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      { props => <Component {...props} />}
    </Formik>
  )
}

export default AccessibleForm