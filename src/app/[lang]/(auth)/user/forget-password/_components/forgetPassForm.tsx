'use client'
import { LoadingButton } from '@mui/lab'
import * as Yup from 'yup';
import { Stack, TextField, Typography } from '@mui/material'
import { FormikProvider, Form, useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast';
import { forgetPassword } from '@src/actions';
const ForgetFormSchema = Yup.object().shape({
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null as any], 'Passwords must match').required('Confirm Password is required')
})

function ForgetForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('newpassword', values.password);
      formData.append('confirmed', values.confirmPassword);
      setSubmitting(true)
      try {
        const response: any = await forgetPassword(formData);
        if (!response) {
          setSubmitting(false);
          toast.error('Something went wrong')
          return;
        }
        if (!response.status) {
          setSubmitting(false);
          toast.error(response.message)
          return;
        }

        toast.success(response.message)
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        toast.error('Something went wrong')
      }

    }
    , validationSchema: ForgetFormSchema
  })
  const { touched, errors, values, handleSubmit, getFieldProps, isSubmitting } = formik
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <Stack spacing={1} width={1}>
          <Stack alignItems='flex-start'>
            <Typography mb={.5} fontWeight={500}>Email</Typography>
            <TextField
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              type='email' placeholder='Enter your email' fullWidth {...getFieldProps('email')} name="email" />
          </Stack>
          <Stack alignItems='flex-start'>
            <Typography mb={.5} fontWeight={500}>Password</Typography>
            <TextField type='password' placeholder='Enter your password' fullWidth {...getFieldProps('password')} name="password"
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}

            />
          </Stack>
          <Stack alignItems='flex-start'>
            <Typography mb={.5} fontWeight={500}>Confirm Password</Typography>
            <TextField type='password' placeholder='Enter your password' fullWidth {...getFieldProps('confirmPassword')} name="confirmPassword"
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
          </Stack>
        </Stack>
        <LoadingButton fullWidth loading={isSubmitting} type='submit' sx={{ mt: 1, maxWidth: '80%' }} disabled={isSubmitting} variant='contained'>Submit</LoadingButton>
      </Form>
    </FormikProvider>
  )
}

export default ForgetForm