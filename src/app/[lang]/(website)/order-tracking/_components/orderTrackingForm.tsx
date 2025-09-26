'use client'
import { Grid2 as Grid, Card, CardContent, CardHeader, Collapse, Container, FormControl, Paper, Stack, TextField, Typography, Box, TableRow, TableCell, styled, TableContainer, Table, TableHead, TableBody, Chip } from '@mui/material'
import React from 'react'
import * as Yup from 'yup';
import { Form, useFormik, FormikProvider } from 'formik'
import { LoadingButton } from '@mui/lab';
import { trackingOrder } from '@src/actions'
import toast from 'react-hot-toast';
import Image from 'next/image';
import { getImageUrl } from '@src/utils/getImageUrl';

const ThumbImgStyle = styled(Image)(({ theme }) => ({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius
}));
const OrderTrackingFormSchema = Yup.object().shape({
    orderId: Yup.string().required('Order ID is required'),
});

function OrderTrackingForm() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState<any[] | null>(null);
    const order = data && data[0];
    function formatTimestamp(timestamp: string) {
        // Convert the input timestamp to a Date object
        const date = new Date(timestamp);

        // Format the date and time
        const formattedDate = date.toLocaleDateString("en-US");
        const formattedTime = date.toLocaleTimeString("en-US");

        // Combine the date and time in the desired format
        return `${formattedDate}, ${formattedTime}`;
    }
    const formik = useFormik({
        initialValues: {
            orderId: '',
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response: any = await trackingOrder(values.orderId);
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
                setData(response.order);
                setOpen(true);
            } catch (error) {
                console.error(error);
                setSubmitting(false);
                toast.error('Something went wrong')
            }

        },
        validationSchema: OrderTrackingFormSchema
    });
    const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik
    return (
        <Card sx={{ maxWidth: 600, mx: 'auto', mb: 4, border: 1, borderColor: 'divider', input: { py: 1.4 } }}>
            <CardHeader title='Order Tracking' />
            <CardContent>
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit}>
                        <Stack spacing={1.3}>
                            <FormControl fullWidth variant="outlined">
                                <Typography gutterBottom>
                                    Order ID {" "}
                                    <Typography variant='caption' color="error.main">*</Typography>
                                </Typography>
                                <TextField placeholder='Enter the order ID'
                                    {...getFieldProps('orderId')}
                                    error={Boolean(touched.orderId && errors.orderId)}
                                    helperText={touched.orderId && errors.orderId}

                                />
                            </FormControl>
                            <LoadingButton loading={isSubmitting} disabled={isSubmitting} variant='contained' type='submit'>Track</LoadingButton>
                        </Stack>
                    </Form>
                </FormikProvider>
                {order && <Box mt={1.5} />}
                <Collapse in={open}>
                    <Card sx={{ border: 1, borderColor: 'divider', boxShadow: 'none' }}>
                        <CardContent sx={{ p: 2 }}>
                            <Grid container spacing={1}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Stack direction='row' alignItems='center' spacing={.5}>
                                        <Typography variant='body2'>Order ID:</Typography>
                                        <Typography variant='body2' fontWeight={500}>{order?.order_id}</Typography>

                                    </Stack>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Stack direction='row' alignItems='center' spacing={.5}>
                                        <Typography variant='body2'>Full Name:</Typography>
                                        <Typography variant='body2' fontWeight={500}>{order?.buyer.name}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Stack direction='row' alignItems='center' spacing={.5}>
                                        <Typography variant='body2'>Date/Time:</Typography>
                                        <Typography variant='body2' fontWeight={500}>{formatTimestamp(order?.created_at)}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Stack direction='row' alignItems='center' spacing={.5}>
                                        <Typography variant='body2'>Phone:</Typography>
                                        <Typography variant='body2' fontWeight={500}>{order?.buyer?.phone}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Stack direction='row' alignItems='center' spacing={.5}>
                                        <Typography variant='body2'>Order status:</Typography>
                                        <Typography variant='body2' fontWeight={500} color={order?.order_status === "Pending" ? "warning" : 'primary'}>{order?.order_status}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Stack direction='row' alignItems='center' spacing={.5}>
                                        <Typography variant='body2'>Address:</Typography>
                                        <Typography variant='body2' fontWeight={500}>{order?.delivery_address}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Stack spacing={1}>
                                        <Stack direction='row' alignItems='center' spacing={.5}>
                                            <Typography variant='body2'>Payment method:</Typography>
                                            <Typography variant='body2' fontWeight={500}>{order?.payment_method || 'COD'}</Typography>
                                        </Stack>
                                        <Stack direction='row' alignItems='center' spacing={.5}>
                                            <Typography variant='body2'>Order Type:</Typography>
                                            <Typography sx={{ textTransform: 'capitalize' }} variant='body2' fontWeight={500}>{order?.order_type}</Typography>
                                        </Stack>

                                    </Stack>
                                </Grid>
                            </Grid>
                            {order?.transaction_id &&
                                <Stack mt={1} direction='row' alignItems='center' spacing={.5}>
                                    <Typography variant='body2'>Transaction ID:</Typography>
                                    <Typography sx={{ textTransform: 'capitalize' }} variant='body2' fontWeight={500}>{order?.transaction_id || 'Nill'}</Typography>
                                </Stack>
                            }
                            <Stack mt={3} spacing={2}>
                                <Typography variant='h5'>
                                    Products
                                </Typography>
                                <TableContainer sx={{ minWidth: 1 }}>
                                    <Table sx={{ '.MuiTableCell-root': { p: 1, lineHeight: '80%' } }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell>Image</TableCell>
                                                <TableCell align="left">Product</TableCell>
                                                <TableCell align="left">Amount</TableCell>
                                                <TableCell align="left">Quantity</TableCell>
                                                <TableCell align="right">Total Price</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {order && order?.order_products?.map((product: any) => {
                                                const { name, order_variants, image, } = product;
                                                return order_variants.map((v: any, idx: number) => {
                                                    return (
                                                        <TableRow key={v.id}>
                                                            <TableCell>{idx + 1}</TableCell>
                                                            <TableCell>

                                                                <ThumbImgStyle width={50} height={50} alt="product image" src={getImageUrl('product', image)}
                                                                />


                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <Typography fontWeight={500} variant='body2' noWrap sx={{
                                                                    maxWidth: 150,
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap',

                                                                }}>{name}</Typography>

                                                            </TableCell>
                                                            <TableCell align="left">
                                                                {v?.price}
                                                            </TableCell>

                                                            <TableCell align="center">
                                                                {v.order_qty}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Typography variant='body2' fontWeight={500}>
                                                                    {v?.price * v.order_qty}
                                                                </Typography>
                                                            </TableCell>

                                                        </TableRow>
                                                    )

                                                })

                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Stack direction='row' spacing={2}>
                                    <Typography >Shipping fee:</Typography>
                                    <Typography fontWeight={500}>{order?.freight_charges}</Typography>
                                </Stack>
                                <Stack direction='row' spacing={2}>
                                    <Typography >Total Amount:</Typography>
                                    <Typography fontWeight={500}>{order?.total_amount}</Typography>
                                </Stack>
                                <Typography variant='h5'>Shipping Information:</Typography>
                                <Stack direction='row' alignItems='center' spacing={2}>
                                    <Typography >Shipping Status:</Typography>

                                    <Chip sx={{ height: 26 }} color='warning' label={order?.order_status} />

                                </Stack>
                            </Stack>

                        </CardContent>
                    </Card>
                </Collapse>
            </CardContent>
        </Card>

    )
}

export default OrderTrackingForm