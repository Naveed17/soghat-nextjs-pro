'use client'
import React from 'react'
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
const inquiries = [
    {
        value: 'general_inquiry',
        label: 'General Inquiry'
    },
    {
        value: 'informational_queries',
        label: 'Informational Queries'
    },
    {
        value: "transactional_queries",
        label: "Transactional Queries"
    },
    {
        value: 'local_queries',
        label: 'Local Queries'
    }
]
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    message: Yup.string().required('Message is required'),
});
function ContactUsForm() {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
            subject: "general_inquiry"
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            toast.success('Message sent successfully');
            resetForm()
        },
        validationSchema,
    });
    const { errors, touched, handleSubmit, getFieldProps } = formik
    React.useEffect(() => {
        document.body.style.paddingTop = `0px`;
    }, []);
    return (
        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
                <Stack spacing={{ xs: 2, sm: 5 }} pt={4} pr={{ xs: 0, sm: 4 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ input: { py: 1.4 } }}>
                        <FormControl fullWidth variant="outlined">
                            <Typography gutterBottom>First Name</Typography>
                            <TextField placeholder='First Name' {...getFieldProps('firstName')}
                                error={Boolean(touched.firstName && errors.firstName)}
                                helperText={touched.firstName && errors.firstName}



                            />
                        </FormControl>
                        <FormControl fullWidth variant="outlined">
                            <Typography gutterBottom>Last Name</Typography>
                            <TextField placeholder='Last Name' {...getFieldProps('lastName')}
                                error={Boolean(touched.lastName && errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                            />
                        </FormControl>
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ input: { py: 1.4 } }}>
                        <FormControl fullWidth variant="outlined">
                            <Typography gutterBottom>Email</Typography>
                            <TextField placeholder='Email' {...getFieldProps('email')}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </FormControl>
                        <FormControl fullWidth variant="outlined">
                            <Typography gutterBottom>Phone</Typography>
                            <TextField placeholder='Phone' {...getFieldProps('phone')}
                                error={Boolean(touched.phone && errors.phone)}
                                helperText={touched.phone && errors.phone}
                            />
                        </FormControl>
                    </Stack>
                    <Stack>
                        <Typography variant='subtitle1'>Select Subject?</Typography>
                        <RadioGroup
                            row
                            sx={{ '.MuiFormControlLabel-label': { fontSize: 14, fontWeight: 500 } }}
                            {...getFieldProps('subject')}

                        >
                            {
                                inquiries.map((item, idx) => (
                                    <FormControlLabel
                                        key={idx}
                                        value={item.value}
                                        control={<Radio />}
                                        label={item.label}
                                    />
                                ))
                            }


                        </RadioGroup>
                    </Stack>
                    <Stack>
                        <Typography gutterBottom>Message</Typography>
                        <TextField
                            placeholder='Write your Message...' multiline rows={3} {...getFieldProps('message')}
                            error={Boolean(touched.message && errors.message)}
                            helperText={touched.message && errors.message}
                        />
                    </Stack>

                </Stack>
                <Stack mt={2} alignItems='flex-end' pr={{ xs: 0, sm: 4 }} pb={{ xs: 0, sm: 4 }}>
                    <Button type='submit' variant='contained' size='large'>
                        Send Message
                    </Button>
                </Stack>
            </Form>

        </FormikProvider>
    )
}

export default ContactUsForm