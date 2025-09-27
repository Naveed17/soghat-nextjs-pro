'use client'
import { Stack, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import React from 'react'
import { LoadingButton } from '@mui/lab';
import { createUser } from '@src/actions';
import toast from 'react-hot-toast';

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phone: Yup.string().required('Phone is required').matches(/^03\d{9}$/, 'Phone number must start with 03 and be exactly 11 digits'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), null as any], 'Passwords must match').required('Confirm password is required'),
});

function SignUpForm() {

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirm_password: ''

        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setSubmitting(true);
                const formData = new FormData();
                formData.append('reg_fn', values.firstName);
                formData.append('reg_ln', values.lastName);
                formData.append('reg_email', values.email);
                formData.append('reg_phone', values.phone);
                formData.append('password', values.password);
                const response = await createUser(formData);
                if (!response) {
                    setSubmitting(false);
                    toast.error('Something went wrong')
                    return;
                }
                if (!response.Boolean) {
                    setSubmitting(false);
                    toast.error(response.message)
                    return;
                }
                setSubmitting(false);
                toast.success(response.message)

            } catch (error) {
                console.error(error);
                setSubmitting(false);
                toast.error('Something went wrong')
            }

        },
        validationSchema: SignUpSchema
    });
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
    return (

        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
                <Stack width={1} spacing={1.5} maxHeight={500} overflow='auto' p={4}>
                    <Typography variant='h3'>Sign Up</Typography>
                    <TextField fullWidth placeholder='First Name'
                        {...getFieldProps('firstName')}
                        error={Boolean(touched.firstName && errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                    />
                    <TextField fullWidth placeholder='Last Name'
                        {...getFieldProps('lastName')}
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                    />
                    <TextField fullWidth placeholder='Email'
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <TextField fullWidth placeholder='Phone'
                        {...getFieldProps('phone')}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                    />
                    <TextField fullWidth placeholder='Password'
                        {...getFieldProps('password')}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                    <TextField fullWidth placeholder='Confirm Password'
                        {...getFieldProps('confirm_password')}
                        error={Boolean(touched.confirm_password && errors.confirm_password)}
                        helperText={touched.confirm_password && errors.confirm_password}
                    />

                    <LoadingButton loading={isSubmitting} type='submit' className='btn-submit' sx={{ alignSelf: 'center' }} variant='contained' disabled={isSubmitting}>Sign Up</LoadingButton>

                </Stack>



            </Form>
        </FormikProvider>

    )
}

export default SignUpForm 