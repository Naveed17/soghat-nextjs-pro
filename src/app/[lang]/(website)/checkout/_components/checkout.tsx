'use client'
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Collapse,
    Container, Dialog, DialogContent, DialogTitle, Divider, FormControlLabel, Grid2 as Grid, IconButton, LinearProgress, Radio, RadioGroup, Stack,
    TextField,
    Typography,

} from '@mui/material'
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {

} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { memo, useEffect, useRef, useState } from 'react'
import { CheckoutSummaryCard } from '@components/cards';
import { useAppSelector, useAppDispatch } from '@lib/redux/store';
import { selectCart } from '@lib/redux/cart';
import { setOrder } from '@lib/redux/order';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { orderComplete, getToken, customerValidate, customerValidateWallet, walletPayment, transaction } from '@src/actions';
import toast from 'react-hot-toast';
import { OrderProductList } from '@components/lists';
import { v4 as uuidv4 } from 'uuid';
import PayFastForm from './payFastForm';
import PayfastResponseHandler from './payfastResponseHandler';
import { Player } from "@lottiefiles/react-lottie-player";
import Cookies from 'js-cookie';
import { encryptData } from '@lib/cryptoJS'
import CloseIcon from '@mui/icons-material/Close';
import PayFastIntegration from './payFastRedirectionPayment';
const LottiePlayer: any = memo(({ src, ...props }: any) => {
    return (
        <Player src={src}
            {...props} />
    );
})
LottiePlayer.displayName = "lottie-player";
const custom_validation = async ({ value, data }: { value: string; data: any }) => {
    if (value !== 'wallet') {
        return customerValidate(data)
    }
    const { data_3ds_callback_url, checkout_url, save_instrument, currency_code, ...rest } = data
    return customerValidateWallet(rest);

}
function CheckoutComponent({ ...props }) {
    const { session } = props;
    const user = session?.user;
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const errorCode = searchParams.toString().match(/err_code=(\d+)/)?.[1] as any
    const router = useRouter()
    const dispatch = useAppDispatch();
    const [getTokenLoading, setGetTokenLoading] = useState(false);
    const [getTokenData, setGetTokenData] = useState<{ token: string, amount: number, order_id: string } | null>(null);
    const [customerValidateData, setCustomerValidateData] = useState<any>(null);
    const [payFastTransactionData, setPayFastTransactionData] = useState<null | any>(null);
    const [payFastLoading, setPayFastLoading] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const [walletTransactionData, setWalletTransactionData] = useState<null | any>(null);
    const [payFastRedirectTransactionData, setPayFastRedirectTransactionData] = useState<null | any>(null)
    const [open, setOpen] = useState<boolean>(false);
    const payment_methods = [
        { value: 'COD', label: 'Cash on Delivery', icon: '/static/images/cash-on-delivery.svg' },
        { value: 'pay_fast', label: 'Card Payment', icon: '/static/images/visa-logo.svg' },
        { value: 'bank', label: 'Bank Transfer', icon: '/static/images/bank-transfer.svg' },
        { value: 'wallet', label: 'Mobile Wallet', icon: '/static/images/mobile-wallet.png' },
        { value: 'redirect', label: 'Pay Fast', icon: '/static/images/HiresPayFastLogo.png' }
    ]
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { websiteContent } = useAppSelector(state => state.websiteContent);
    const { payfast_api, payfast_redirection, payment_cod } = websiteContent;
    const filteredPaymentMethods = payment_methods.filter(method => {
        if (payfast_redirection === 1) {
            // Remove 'pay_fast', 'wallet', and 'bank' when payfast_redirection is 1
            return !['pay_fast', 'wallet', 'bank'].includes(method.value);
        } else if (payfast_api === 1) {
            return method.value !== 'redirect';
        } else if (payment_cod === 0) {
            return method.value !== 'COD';
        }
    });
    let { cart, total, netTotal, freight, discount } = useAppSelector(selectCart);
    const productsPayload = cart.reduce((acc, curr) => {
        const { id, variant } = curr;
        const product = {
            p_id: id,
            info: variant.map((_v: any) => ({
                v_id: _v.id,
                sub_v_id: "null",
                sub_sub_v_id: "null",
                qty: _v.quantity,
                price: _v.sell_price
            }))


        }
        acc.push(product);
        return acc;

    }, [])
    const handlePlaceOrder = async ({ ...payload }) => {
        const { values, setSubmitting, payFastTrxData = null as any, walletData = null as any, basket_id = null, payFastRedirectTransaction_id = null } = payload
        const data = {
            action: 'confirm',
            buyer_ip: '192231213',
            buyer_id: user?.id,
            customer_name: values.receiver,
            customer_number: values.phone,
            delivery_address: values.address,
            order_type: 'marketplace',
            order_from: 'web',
            products: JSON.stringify(productsPayload),
            total_amount: total,
            discount: discount,
            freight_charges: freight,
            net_amount: netTotal,
            payment_status: '0',
            cash_on_delivery: '1',
            payment_method: 'COD',
            basket_id,
            ...(payFastTrxData && payFastTrxData.status && {
                payment_method: 'Payfast',
                cash_on_delivery: '0',
                transaction_id: payFastTrxData.transaction_id,
                order_type: payFastTrxData.status ? 'paid' : 'unpaid',
                payment_status: payFastTrxData.status ? '1' : '0',
                basket_id,

            }),
            ...(values.payment_method === 'wallet' && {
                payment_method: values.wallet.wallet_type,
                cash_on_delivery: '0',
                transaction_id: walletData.transaction_id,
                order_type: 'paid',
                payment_status: '1',
                basket_id
            }),
            ...(values.payment_method === 'redirect' && {
                payment_method: 'PayFast',
                cash_on_delivery: '0',
                transaction_id: payFastRedirectTransaction_id,
                order_type: 'paid',
                payment_status: '1',
                basket_id
            })
        }

        setSubmitting(true);
        try {
            const response = await orderComplete(data);
            if (!response) {
                setSubmitting(false);
                toast.error('Something went wrong')
                return response;
            }
            if (!response.Boolean) {
                setSubmitting(false);
                toast.error(response.message)
                return response;
            }

            toast.success(response.message);
            dispatch(setOrder(response.order[0]));
            setSubmitting(false);
            return response

        } catch (error) {
            console.error(error);
            setSubmitting(false);
            toast.error('Something went wrong')
        }

    }

    useEffect(() => {
        const fetchOrder = async () => {
            setOrderLoading(true)
            const response = await handlePlaceOrder({ values, setSubmitting, basket_id: payFastRedirectTransactionData.basket_id, payFastRedirectTransaction_id: payFastRedirectTransactionData.transaction_id });
            setOrderLoading(false)
            // router.push(`/checkout/order-complete?order_id=${response.order[0].order_id}&buyer_id=${response.order[0].buyer_id}`);
        }
        if (payFastRedirectTransactionData) {
            fetchOrder();
        }


    }, [payFastRedirectTransactionData])
    const isEmptyCart = cart.length === 0;
    const NewAddressSchema = Yup.object().shape({
        receiver: Yup.string().required('Fullname is required'),
        phone: Yup.string().required('Phone is required').matches(/^03\d{9}$/, 'Phone number must start with 03 and be exactly 11 digits'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        pay_fast: Yup.object().when('payment_method', {
            is: 'pay_fast',
            then: (schema) => schema.shape({
                card_number: Yup.string()
                    .transform((value) => value.replace(/\s+/g, '')) // Remove spaces
                    .required('Card number is required')
                    .matches(/^\d{16}$/, 'Card number must be exactly 16 digits'),
                expiry: Yup.string()
                    .transform((value) => value.replace(/\//g, '')) // Remove /
                    .required('Expiry is required')
                    .matches(/^\d{4}$/, 'Expiry must be exactly 4 digits'),
                cvv: Yup.string()
                    .required('CVV is required')
                    .matches(/^\d{3}$/, 'CVV must be exactly 3 digits'),
            }),
            otherwise: (schema) => schema.shape({
                card_number: Yup.string().notRequired(),
                expiry: Yup.string().notRequired(),
                cvv: Yup.string().notRequired(),
            }),
        }),

        wallet: Yup.object().when('payment_method', {
            is: 'wallet',
            then: (schema) => schema.shape({
                account_number: Yup.string().required('Account Number is required'),
                cnic_number: Yup.string().required('CNIC Number is required'),
            }),
            otherwise: (schema) => schema.shape({
                account_number: Yup.string().notRequired(),
                cnic_number: Yup.string().notRequired(),
            }),
        }),

        bank: Yup.object().when('payment_method', {
            is: 'bank',
            then: (schema) => schema.shape({
                account_number: Yup.string().required('Account Number is required'),
                cnic_number: Yup.string().required('CNIC Number is required'),
                bank_code: Yup.string().required('Bank Code is required'),
            }),
            otherwise: (schema) => schema.shape({
                account_number: Yup.string().notRequired(),
                cnic_number: Yup.string().notRequired(),
            }),
        }),


    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            receiver: user?.name as string || '' as string,
            phone: user?.phone as string || '' as string,
            address: user?.address as string || '' as string,
            city: user?.city as string || '' as string,
            province: '',
            email: user?.email as string || '' as string,
            payment_method: searchParams.toString() ? 'redirect' : 'COD',
            pay_fast: {
                card_number: "",
                expiry: "",
                cvv: "",
            },
            wallet: {
                wallet_type: 'jazz_cash',
                account_number: "",
                cnic_number: ""
            },
            bank: {
                bank_code: '',
                account_number: "",
                cnic_number: ""
            }

        },
        validationSchema: session ? NewAddressSchema : null,
        onSubmit: async (values, { setSubmitting }) => {

            if (!session) {
                router.push(`/user/login-register?callback=${encodeURIComponent(pathname)}`);
                setSubmitting(false)
                return null;
            }

            if (values.payment_method === "COD") {
                setSubmitting(true);
                const response = await handlePlaceOrder({ values, setSubmitting });
                if (!response || !response.Boolean) {
                    setSubmitting(false);
                    return;
                }
                setSubmitting(false);
                router.push(`/checkout/order-complete?order_id=${response.order[0].order_id}&buyer_id=${response.order[0].buyer_id}`);


            } else if (values.payment_method === "pay_fast" || values.payment_method === 'wallet' || values.payment_method === 'bank') {
                const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
                setSubmitting(true);

                // Validate essential data
                if (!getTokenData?.order_id || !getTokenData?.amount || !getTokenData?.token) {
                    throw new Error('Missing essential token data for processing payment');
                }
                const data = {
                    basket_id: getTokenData.order_id,
                    user_id: `${user.id}`,
                    txnamt: getTokenData.amount.toString(),
                    bearer_token: getTokenData.token,
                    order_date: new Date().toISOString().split('T')[0],
                    customer_mobile_no: values.phone || '',
                    customer_email_address: values.email || '',
                    account_type_id: values.payment_method === "pay_fast" ? '1' :
                        values.payment_method === "wallet" ? '4' : '3',
                    currency_code: 'PKR',
                    data_3ds_callback_url: `${SITE_URL}/api/payfast/callback`,
                    checkout_url: `${SITE_URL}/api/payfast/checkout`,
                    save_instrument: 'true',
                    ...(values.payment_method === "wallet" && {
                        account_number: values.wallet.account_number,
                        cnic_number: values.wallet.cnic_number,
                        bank_code: values.wallet.wallet_type === 'jazz_cash' ? '1' : '13'


                    }),
                    ...(values.payment_method === 'bank' && {
                        ...values.bank,

                    }),
                    ...(values.payment_method === 'pay_fast' && {
                        card_number: values.pay_fast.card_number.replace(/\s+/g, ''),
                        expiry_month: values.pay_fast.expiry.split('/')[0].trim(),
                        expiry_year: values.pay_fast.expiry.split('/')[1].trim(),
                        cvv: values.pay_fast.cvv,
                    }),
                };

                try {
                    const response = await custom_validation({ value: values.payment_method, data });
                    if (!response) {
                        setSubmitting(false);
                        toast.error('Something went wrong')
                        return;
                    }
                    if (response.status === "error") {
                        setSubmitting(false);
                        toast.error(response.message)
                        return;
                    }
                    if (response.error) {
                        setSubmitting(false);
                        toast.error(response.error)
                        return;
                    }

                    if (values.payment_method === 'pay_fast') {

                        const { data_3ds_secureid, transaction_id, } = response
                        const encryptedData = encryptData({
                            data_3ds_secureid,
                            transaction_id,
                            ...data,


                        });

                        Cookies.set('customer_validate', encryptedData, {
                            httpOnly: false,
                            sameSite: 'none',
                            secure: true,
                            expires: 1 / 24,
                            path: '/'
                        });
                        setSubmitting(false);

                    }
                    setCustomerValidateData(response);
                    handleClickOpen();

                    if (values.payment_method === 'wallet') {
                        const { data_3ds_callback_url, checkout_url, save_instrument, currency_code, ...rest } = data
                        if (response.error) {
                            toast.error(response.error)
                            return
                        }
                        const { responce: { transaction_id } } = response
                        const payload = {
                            ...rest,
                            transaction_id,

                        }
                        try {
                            const transactionPromise = walletPayment(payload);
                            const handlePlaceOrderPromise = transactionPromise
                                .then((transaction) => {
                                    if (!transaction || transaction.status === "error") {
                                        toast.error(transaction?.message || 'Transaction failed')
                                        throw new Error(transaction?.message || 'Transaction failed');
                                    }

                                    // Return the second API call promise
                                    setWalletTransactionData(transaction.responce)
                                    setOrderLoading(true)
                                    return handlePlaceOrder({ values, setSubmitting, walletData: transaction.responce, basket_id: getTokenData?.order_id || null });
                                })
                                .then((response) => {
                                    setSubmitting(false);
                                    if (!response || !response.Boolean) {
                                        throw new Error('Place order failed');
                                    }

                                    return response;
                                })
                            const results = await Promise.all([transactionPromise, handlePlaceOrderPromise]);
                            const [transaction, placeOrderResponse] = results;
                            router.push(`/checkout/order-complete?order_id=${placeOrderResponse.order[0].order_id}&buyer_id=${placeOrderResponse.order[0].buyer_id}`);

                        } catch (error) {
                            console.error(error);
                            setSubmitting(false);
                            toast.error('Something went wrong')

                        }

                    }

                } catch (error) {
                    console.error(error);
                    setSubmitting(false);
                    toast.error('Something went wrong')
                }

            }
        }
    })

    let [retryCount, setRetryCounter] = useState<number>(0)

    const { errors, values, setFieldValue, touched, setSubmitting, isSubmitting, handleSubmit, getFieldProps } = formik;
    const lastPaymentMethod = useRef(values.payment_method);
    async function checkPaymentStatus(values: any) {
        try {
            const response = await fetch("/api/payfast/paymentStatus");
            const data = await response.json();
            if (data.status === "pending") {
                setRetryCounter((prev) => prev + 1)
                const delay = Math.min(2000 * Math.pow(2, retryCount), 5000); // Max 5s
                setTimeout(() => checkPaymentStatus(values), delay);
            } else {
                if (data.status) {
                    setPayFastLoading(true)
                    setPayFastTransactionData(data)
                    Cookies.remove('success_transaction', { path: '/' });

                } else {
                    console.log(`Payment failed: ${data.message}`);
                }
            }
        } catch (err) {
            console.error("Error checking payment status:", err);
            setTimeout(checkPaymentStatus, 5000); // Retry after 5 seconds on error
        }
    }
    useEffect(() => {
        // Ensure checkPaymentStatus is only called once when payment method is 'pay_fast'
        if (values.payment_method === 'pay_fast' && lastPaymentMethod.current !== values.payment_method) {
            lastPaymentMethod.current = values.payment_method;
            checkPaymentStatus(values);
        }
    }, [values.payment_method]); // Only re-run when necessary
    useEffect(() => {
        setGetTokenData(null)
    }, [])
    const hasProcessed = useRef(false);
    useEffect(() => {
        const processTransaction = async () => {
            if (payFastTransactionData && !hasProcessed.current) {
                hasProcessed.current = true; // Mark as processed
                try {
                    const response = await handlePlaceOrder({ values, setSubmitting, payFastTrxData: payFastTransactionData });
                    router.push(`/checkout/order-complete?order_id=${response.order[0].order_id}&buyer_id=${response.order[0].buyer_id}`);
                    if (!response || !response.Boolean) {
                        setSubmitting(false);
                        setPayFastLoading(false);
                        return;
                    }
                } catch (error) {
                    console.error("Error processing transaction:", error);
                    setSubmitting(false);
                    setPayFastLoading(false);
                }
            }
        };

        processTransaction();
    }, [payFastTransactionData, values, setSubmitting, router]);
    return (
        <Container maxWidth="lg">
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Card>
                                <CardHeader title="Shipping information" />
                                <CardContent>
                                    <Stack spacing={{ xs: 2, sm: 3 }}>
                                        <TextField
                                            fullWidth
                                            placeholder="Full Name"
                                            {...getFieldProps('receiver')}
                                            error={Boolean(touched.receiver && errors.receiver)}
                                            helperText={touched.receiver && errors.receiver}
                                        />
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                            <TextField
                                                fullWidth
                                                placeholder="Email"
                                                {...getFieldProps('email')}
                                                error={Boolean(touched.email && errors.email)}
                                                helperText={touched.email && errors.email}
                                            />
                                            <TextField
                                                fullWidth
                                                placeholder="Phone Number"
                                                {...getFieldProps('phone')}
                                                error={Boolean(touched.phone && errors.phone)}
                                                helperText={touched.phone && errors.phone}
                                            />
                                        </Stack>

                                        <TextField
                                            fullWidth
                                            placeholder="Address"
                                            {...getFieldProps('address')}
                                            error={Boolean(touched.address && errors.address)}
                                            helperText={touched.address && errors.address}
                                        />

                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                            <TextField
                                                fullWidth
                                                placeholder="Province"
                                                {...getFieldProps('province')}
                                                error={Boolean(touched.province && errors.province)}
                                                helperText={touched.province && errors.province}
                                            />
                                            <TextField
                                                fullWidth
                                                placeholder="Town / City"
                                                {...getFieldProps('city')}
                                                error={Boolean(touched.city && errors.city)}
                                                helperText={touched.city && errors.city}
                                            />

                                        </Stack>

                                        <Stack>
                                            <TextField
                                                fullWidth
                                                multiline
                                                minRows={4}
                                                placeholder="Order notes (optional)"
                                                {...getFieldProps('order_note')}

                                            />
                                        </Stack>


                                    </Stack>

                                </CardContent>

                            </Card>

                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Stack spacing={2}>
                                <Card>
                                    <CardHeader
                                        title="Product List"
                                    />
                                    <CardContent>
                                        <Stack maxHeight={200} overflow='auto' pr={1}>
                                            <OrderProductList />
                                        </Stack>
                                    </CardContent>
                                </Card>
                                <CheckoutSummaryCard />
                                <Card>
                                    <CardHeader
                                        title="Select Payment Method"
                                    />
                                    <CardContent sx={{ p: 2 }}>
                                        <RadioGroup
                                            row
                                            onChange={(e:
                                                React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                setFieldValue('payment_method', e.target.value);

                                                if (e.target.value !== 'COD') {
                                                    if (!user) {
                                                        toast.error('Please login to continue')
                                                        return
                                                    }
                                                    if (!getTokenData) {
                                                        const order_id = uuidv4();
                                                        const formData = new FormData();
                                                        formData.append('amount', JSON.stringify(total));
                                                        formData.append('order_id', order_id);
                                                        formData.append('user_id', user?.id);
                                                        setGetTokenLoading(true);
                                                        getToken(formData).then((res: { status: string; token: string, message?: string; }) => {
                                                            if (res?.status === "error") {
                                                                setGetTokenLoading(false)
                                                                toast.error(res?.message!)
                                                                return;
                                                            }
                                                            setGetTokenLoading(false)
                                                            setGetTokenData({
                                                                token: res?.token,
                                                                order_id: order_id,
                                                                amount: total
                                                            })
                                                        }).catch((err) => {
                                                            setGetTokenLoading(false)
                                                            toast.error('Something went wrong')
                                                        })
                                                    }
                                                }


                                            }}
                                            value={values.payment_method}
                                        >
                                            {
                                                filteredPaymentMethods.map((method) => (
                                                    <FormControlLabel
                                                        sx={{
                                                            border: theme => `1px solid ${theme.palette.divider}`,
                                                            bgcolor: method.value === values.payment_method ? 'grey.300' : 'transparent',
                                                            '&:hover': {
                                                                bgcolor: 'grey.300'

                                                            },

                                                            ml: 0, p: .5, py: 1, mr: .7, borderRadius: 2, flex: 1, boxShadow: theme => theme.customShadows.primary, '.MuiFormControlLabel-label': { width: 1, textAlign: 'center' }
                                                        }}
                                                        key={method.value}
                                                        value={method.value}
                                                        {...(method.value === 'COD' && {
                                                            disabled: payFastTransactionData ? true : false
                                                        })}

                                                        control={<Radio sx={{ visibility: 'hidden', opacity: 0, display: 'none' }} />}
                                                        label={
                                                            <Stack spacing={.5} alignItems='center' width={1}>
                                                                <img height={method.value === 'redirect' ? '50%' : 24} width={method.value === 'pay_fast' ? 36 : method.value === 'redirect' ? '30%' : 24} src={method.icon} alt={method.label} />
                                                                <Typography fontSize={8} variant="caption">{method.label}</Typography>
                                                            </Stack>
                                                        }
                                                    />
                                                ))
                                            }



                                        </RadioGroup>
                                        {payfast_api === 1 &&
                                            <Box mt={1}>
                                                <PayFastForm {...{ formik, loading: getTokenLoading, user, getTokenData }} />
                                            </Box>
                                        }
                                        {
                                            values.payment_method === 'redirect' && (
                                                !searchParams.toString() && getTokenLoading &&

                                                <Stack mt={3} alignItems='center' justifyContent='center' height={75} position='relative'>
                                                    <Typography>Please Wait Order Token Is being Generating</Typography>

                                                    <CircularProgress sx={{ mt: 2 }} />

                                                </Stack>
                                            )
                                        }
                                    </CardContent>
                                </Card>
                                {(payfast_redirection !== 1 || values.payment_method === 'COD') && (
                                    <LoadingButton loading={isSubmitting || (values.payment_method === "wallet" && getTokenLoading)} fullWidth size="large" type="submit" variant="contained" disabled={isEmptyCart || isSubmitting || getTokenLoading || (values.payment_method !== "COD" && !getTokenData)}>
                                        {!open ? values.payment_method !== "COD" ? payFastTransactionData ? "Place Order" : "Pay Now" : "Place Order" : "Place Order"}
                                    </LoadingButton>
                                )}
                                {(payfast_redirection === 1 && values.payment_method === 'redirect') && (
                                    <PayFastIntegration {...{ values, basketId: getTokenData?.order_id, user, total, getTokenLoading, setPayFastRedirectTransactionData, orderLoading }} />
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                </Form>
            </FormikProvider>

            <Dialog open={open} fullWidth maxWidth={'md'}>
                <DialogTitle sx={{ pb: 5 }} />
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>

                    {customerValidateData ? (
                        values.payment_method === 'wallet' ?
                            walletTransactionData ? (
                                <Box>
                                    <LottiePlayer
                                        autoplay
                                        keepLastFrame
                                        src="/static/lotties/check.json"
                                        style={{ height: "133px", width: "133px" }}
                                    />
                                    <Stack alignItems='center'>
                                        <Typography textAlign='center' variant="h4" gutterBottom>
                                            Payment Successful
                                        </Typography>
                                        <Typography textAlign='center' variant="body1">
                                            Thank you for your payment
                                        </Typography>
                                        <Divider sx={{ mt: 1, maxWidth: 310, width: 1, mx: 'auto' }} />
                                        <Typography sx={{ mt: 2 }} textAlign='center' variant="body1" fontSize={15} fontWeight={500}>
                                            Transaction ID: {walletTransactionData?.transaction_id}
                                        </Typography>
                                        {orderLoading && (
                                            <Stack alignItems='center' mt={3}>
                                                <Typography textAlign='center' variant="body1">
                                                    Please wait while we process your order.
                                                </Typography>
                                                <CircularProgress sx={{ mt: 2 }} />
                                            </Stack>
                                        )}
                                    </Stack>
                                </Box>
                            ) : (<Stack alignItems='center' mt={3} py={4}>
                                <Typography textAlign='center' variant="body1">
                                    Please wait while we process your order.
                                </Typography>
                                <CircularProgress sx={{ mt: 2 }} />
                            </Stack>) :

                            payFastTransactionData ? (
                                <Box>
                                    <LottiePlayer
                                        autoplay
                                        keepLastFrame
                                        src="/static/lotties/check.json"
                                        style={{ height: "133px", width: "133px" }}
                                    />
                                    <Stack alignItems='center'>
                                        <Typography textAlign='center' variant="h4" gutterBottom>
                                            Payment Successful
                                        </Typography>
                                        <Typography textAlign='center' variant="body1">
                                            Thank you for your payment
                                        </Typography>
                                        <Divider sx={{ mt: 1, maxWidth: 310, width: 1, mx: 'auto' }} />
                                        <Typography sx={{ mt: 2 }} textAlign='center' variant="body1" fontSize={15} fontWeight={500}>
                                            Transaction ID: {payFastTransactionData?.transaction_id}
                                        </Typography>
                                        {payFastLoading && (
                                            <Stack alignItems='center' mt={3}>
                                                <Typography textAlign='center' variant="body1">
                                                    Please wait while we process your order.
                                                </Typography>
                                                <CircularProgress sx={{ mt: 2 }} />
                                            </Stack>
                                        )}
                                    </Stack>
                                </Box>
                            ) :
                                <PayfastResponseHandler htmlResponse={customerValidateData?.data_3ds_html} />
                    ) : (
                        <p>Loading...</p>
                    )}

                </DialogContent>
            </Dialog>
            <Box mt={3} />
        </Container >
    )
}

export default CheckoutComponent