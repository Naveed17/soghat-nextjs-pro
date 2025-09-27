'use client';
import React, { memo, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment-timezone'
import { LoadingButton } from '@mui/lab';
import { CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { Typography } from '@mui/material';
import { Player } from "@lottiefiles/react-lottie-player";
const LottiePlayer: any = memo(({ src, ...props }: any) => {
    return (
        <Player src={src}
            {...props} />
    );
})
export default function PayFastIntegration({ ...props }) {

    const { basketId, total, values, setPayFastRedirectTransactionData, orderLoading, getTokenLoading } = props;
    const searchParams = useSearchParams();
    const [token, setToken] = useState('');
    const [transactionResult, setTransactionResult] = useState('');
    const [transactionResultLoading, setTransactionResultLoading] = useState(false)
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    const [formData, setFormData] = useState({
        CURRENCY_CODE: 'PKR',
        MERCHANT_ID: '102',
        SUCCESS_URL: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
        FAILURE_URL: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
        CHECKOUT_URL: 'https://typedwebhook.tools/webhook/cfe4e40e-8c5c-4d5b-867a-017bce41070c',
        TXNAMT: total,
        BASKET_ID: basketId,
        ORDER_DATE: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        SIGNATURE: 'SOME-RANDOM-STRING',
        VERSION: 'MERCHANT-CART-0.1',
        TXNDESC: 'Item Purchased from Cart',
        PROCCODE: '00',
        TRAN_TYPE: 'ECOMM_PURCHASE',
        STORE_ID: '102',
        RECURRING_TXN: 'true'
    });

    useEffect(() => {
        if (searchParams.toString()) {
            const processResponse = async () => {
                const response = Object.fromEntries(searchParams.entries());
                const result = await fetch('/api/payfast/process-payfast-response', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(response),
                });
                setTransactionResultLoading(true)
                const data = await result.json();
                setTransactionResultLoading(false)
                setTransactionResult(data.message);
                if (data.status === 'success') {
                    setPayFastRedirectTransactionData(data)
                }

            };
            processResponse();
        } else {
            // Get access token
            const fetchToken = async () => {
                const response = await fetch('/api/payfast/get-payfast-token');
                const data = await response.json();
                if (data.token) setToken(data.token);
            };
            fetchToken();
        }
    }, [searchParams]);


    if (transactionResult || searchParams.toString()) {
        const errorCode = searchParams.toString().match(/err_code=(\d+)/)?.[1] as any
        return (
            <React.Fragment>
                <Dialog
                    open={open}
                    maxWidth='xs'
                    fullWidth
                >
                    <DialogTitle sx={{
                        py: 1.5,
                        ...((["000", "00"].includes(errorCode)) ? {
                            bgcolor: 'success.main',
                            color: 'white'

                        } : {
                            bgcolor: 'error.main',
                            color: 'white',
                        })
                    }}>
                        {["000", "00"].includes(errorCode) ? <Stack direction='row' alignItems='center' spacing={1}><Icon icon="line-md:alert" width="22" height="22" /><span>Success</span></Stack> : <Stack direction='row' alignItems='center' spacing={1}><Icon icon="line-md:alert" width="22" height="22" /><span>Failed</span></Stack>}
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={(theme) => ({
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: theme.palette.common.white,
                            })}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Stack mt={2}>
                                {
                                    ["000", "00"].includes(errorCode) && <LottiePlayer
                                        autoplay
                                        keepLastFrame
                                        src="/static/lotties/check.json"
                                        style={{ height: "133px", width: "133px" }}
                                    />
                                }
                                {

                                    transactionResultLoading ? <CircularProgress /> :
                                        <Typography textAlign='center'>{transactionResult}</Typography>
                                }
                                {

                                    orderLoading && <Stack alignItems='center' mt={2}>
                                        <Typography textAlign='center' variant="body1">
                                            Please wait while we process your order.
                                        </Typography>
                                        <CircularProgress sx={{ mt: 2 }} />
                                    </Stack>
                                }
                            </Stack>
                        </DialogContentText>
                    </DialogContent>

                </Dialog>
            </React.Fragment>
        );
    }

    return (
        <form
            id="PayFast_payment_form"
            name="PayFast-payment-form"
            method="post"
            action="https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction"
        >
            {/* Hidden Fields */}
            <input type="hidden" name="MERCHANT_ID" value={formData.MERCHANT_ID} />
            <input type="hidden" name="TOKEN" value={token} />
            <input type="hidden" name="CURRENCY_CODE" value={formData.CURRENCY_CODE} />
            <input type="hidden" name="SIGNATURE" value={formData.SIGNATURE} />
            <input type="hidden" name="VERSION" value={formData.VERSION} />
            <input type="hidden" name="TXNAMT" value={formData.TXNAMT} />
            <input type="hidden" name="TXNDESC" value={formData.TXNDESC} />
            <input type="hidden" name="PROCCODE" value={formData.PROCCODE} />
            <input type="hidden" name="TRAN_TYPE" value={formData.TRAN_TYPE} />
            <input type="hidden" name="ORDER_DATE" value={formData.ORDER_DATE} />
            <input type="hidden" name="RECURRING_TXN" value={formData.RECURRING_TXN} />
            <input type="hidden" name="STORE_ID" value={''} />
            <input type="hidden" name="CUSTOMER_EMAIL_ADDRESS" value={values.email} />
            <input type="hidden" name="CUSTOMER_MOBILE_NO" value={values.phone} />
            <input type="hidden" name="BASKET_ID" value={basketId} />
            <input type="hidden" name="SUCCESS_URL" value={formData.SUCCESS_URL} />
            <input type="hidden" name="FAILURE_URL" value={formData.FAILURE_URL} />
            <input type="hidden" name="CHECKOUT_URL" value={formData.CHECKOUT_URL} />
            <LoadingButton disabled={getTokenLoading} fullWidth variant='contained' size='large' type="submit">Pay Now Width Pay Fast </LoadingButton>
        </form>
    );
}