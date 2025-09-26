'use client'
import { Stack, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import React from 'react'
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';
import { userLogin } from '@src/actions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation'


const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});


function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callback = searchParams.get('callback') || '/';
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',

        },
        onSubmit: async (values, { setSubmitting }) => {
            const fromData = new FormData();
            fromData.append('login_email', values.email);
            fromData.append('login_password', values.password);

            try {
                const response: any = await userLogin(fromData);
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

                toast.success(response.message)
                setSubmitting(false);
                router.push(callback)
            } catch (error) {
                console.error(error);
                setSubmitting(false);
                toast.error('Something went wrong')
            }

        },
        validationSchema: LoginSchema
    });
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;


    return (

        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
                <Stack width={1} spacing={1.5} p={4}>
                    <Typography variant='h3'>Sign in</Typography>
                    <TextField fullWidth placeholder='Email'
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <TextField fullWidth placeholder='Password'
                        {...getFieldProps('password')}
                        type='password'
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}

                    />
                    <LoadingButton loading={isSubmitting} type='submit' className='btn-submit' sx={{ alignSelf: 'center' }} disabled={isSubmitting} variant='contained'>Sign in</LoadingButton>
                    <Link href='/'><strong>Back to Home</strong></Link>
                    <Link className='forget-password' href='/user/forget-password'>Forget Password</Link>
                </Stack>
            </Form>
        </FormikProvider>

    )
}

export default LoginForm