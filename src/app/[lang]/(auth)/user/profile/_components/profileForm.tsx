'use client'
import React, { useCallback } from 'react'
import { updateProfile } from '@src/actions'
import { Button, FormControl, Stack, TextField, Typography, Grid2 as Grid, Box, Paper, Card, CardHeader, CardContent } from '@mui/material'
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import UploadAvatar from './profileCover';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { fData } from '@src/utils/formatNumber';
function ProfileForm({ ...props }) {
    const { user } = props
    const formik = useFormik({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            city: user?.city || '',
            address: user?.address || '',
            avatarUrl: user?.avatarUrl || null,
        },
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            const formData = new FormData();
            formData.append('user_id', user.id);
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('phone', values.phone);
            formData.append('city', values.city);
            formData.append('address', values.address);

            try {
                const response: any = await updateProfile(formData);
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
            } catch (error) {
                console.error(error);
                setSubmitting(false);
                toast.error('Something went wrong')
            }
        }
        ,
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Email must be a valid email address').required('Email is required'),
            phone: Yup.string().required('Phone is required'),
            city: Yup.string().required('City is required'),
            address: Yup.string().required('Address is required'),
            avatarUrl: Yup.mixed().test('fileSize', 'The file is too large', (value: any) => {
                if (!value) {
                    return true; // attachment is optional
                }
                return value.size <= 3145728;
            })
        })
    });
    const { values, handleSubmit, getFieldProps, isSubmitting, setFieldValue, touched, errors } = formik;
    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (file) {
                setFieldValue('avatarUrl', {
                    ...file,
                    preview: URL.createObjectURL(file)
                });
            }
        },
        [values]
    );
    return (
        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit} >
                <Grid container spacing={2} justifyContent='space-between'>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Card sx={{ border: 1, borderColor: 'divider', height: 1, pt: 4 }}>
                            <CardContent>
                                <UploadAvatar
                                    accept={{
                                        'image/png': ['.png'],
                                        'image/jpeg': ['.jpeg'],
                                    }}
                                    file={values.avatarUrl}
                                    maxSize={3145728}
                                    onDrop={handleDrop}
                                    error={Boolean(touched.avatarUrl && errors.avatarUrl)}
                                    caption={
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                mt: 2,
                                                mx: 'auto',
                                                display: 'block',
                                                textAlign: 'center',
                                                color: 'text.secondary'
                                            }}
                                        >
                                            Allowed *.jpeg, *.jpg, *.png
                                            <br /> max size of {fData(3145728)}
                                        </Typography>
                                    }
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 8 }}>
                        <Card sx={{ border: 1, borderColor: 'divider', input: { py: 1.4 } }}>
                            <CardHeader
                                title={<Typography variant='h4'>User Info</Typography>}
                            />
                            <CardContent>
                                <Stack display='grid' sx={{
                                    gridTemplateColumns: {
                                        xs: 'repeat(1, 1fr)',
                                        sm: 'repeat(2, 1fr)'
                                    }, gap: 2,
                                    mb: 2
                                }}>
                                    <FormControl fullWidth variant="outlined">
                                        <Typography gutterBottom>Name</Typography>
                                        <TextField {...getFieldProps('name')} name="name" />
                                    </FormControl>
                                    <FormControl fullWidth variant="outlined">
                                        <Typography gutterBottom>Email</Typography>
                                        <TextField {...getFieldProps('email')} name="email" slotProps={{ input: { readOnly: true } }} />
                                    </FormControl>
                                    <FormControl fullWidth variant="outlined">
                                        <Typography gutterBottom>Phone #</Typography>
                                        <TextField {...getFieldProps('phone')} name="phone" slotProps={{ input: { readOnly: true } }} />
                                    </FormControl>
                                    <FormControl fullWidth variant="outlined">
                                        <Typography gutterBottom>City</Typography>
                                        <TextField {...getFieldProps('city')} name="city" />
                                    </FormControl>
                                    <FormControl sx={{
                                        gridColumn: 'span 2'
                                    }} fullWidth variant="outlined">
                                        <Typography gutterBottom>Address</Typography>
                                        <TextField {...getFieldProps('address')} name="address" />
                                    </FormControl>

                                </Stack>
                                <LoadingButton loading={isSubmitting} type='submit' sx={{ alignSelf: 'flex-start' }} disabled={isSubmitting} variant='contained'>Submit</LoadingButton>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Form>
            <Box sx={{ mt: 4 }} />
        </FormikProvider>
    )
}

export default ProfileForm