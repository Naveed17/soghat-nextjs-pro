'use client'
import { Typography, TextField, Stack, RadioGroup, FormControlLabel, Radio, Autocomplete } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { getBanksList } from '@src/actions';
import { formatBankAccount, formatCardNumber, formatCNIC, formatExpires, formatMobileNumber } from '@src/utils/formatNumber';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
const mobile_wallet = [
    { value: 'jazz_cash', label: 'Jazz Cash', icon: '/static/images/jazz-cash-logo.svg' },
    { value: 'easy_paisa', label: 'Easy Paisa', icon: '/static/images/Easypaisa-logo.svg' },

]
function PayFastForm({ ...props }) {
    const { formik, loading, user, getTokenData } = props;
    const { values, errors, touched, getFieldProps } = formik;
    const [data, setData] = useState<any[]>([]);
    const [openAutoComplete, setOpenAutoComplete] = useState(false);
    const [loadingReq, setLoadingReq] = useState(false);

    const handleOpen = () => {
        if (user) {
            setOpenAutoComplete(true);
            (async () => {
                try {
                    setLoadingReq(true); // Indicate loading
                    const response = await getBanksList({ user_id: user.id, bearer_token: getTokenData.token })

                    if (response.status === "error") {
                        toast.error(response.message)
                        return;
                    }
                    const banks = response.banks

                    setData(banks.map((bank: any) => ({ title: bank.name, code: bank.bank_code })));

                } catch (error) {
                    console.error('Error occurred:', error);
                } finally {
                    setLoadingReq(false); // Reset loading state
                }
            })();
        }
    }

    return (
        <Stack spacing={2} position='relative'>
            {loading && <Stack position='absolute' sx={{ background: 'rgba(255,255,255,0.5)', zIndex: 1 }} alignItems='center' justifyContent='center' width='100%' height='100%'>
                <CircularProgress />
            </Stack>}
            {values.payment_method === 'pay_fast' && (() => {
                const { pay_fast = {} } = values; // Destructure `pay_fast` with a default empty object

                return (
                    <>
                        <Stack spacing={1}>
                            <Typography fontWeight={500} variant="body2">Card Details</Typography>
                            <TextField
                                placeholder="0000 0000 0000 0000"
                                error={Boolean(touched.pay_fast?.card_number && errors.pay_fast?.card_number)}
                                helperText={touched.pay_fast?.card_number && errors.pay_fast?.card_number}
                                size="small"
                                value={formatCardNumber(pay_fast.card_number || '')} // Use destructured `pay_fast`
                                onChange={(e) => {
                                    const val = e.target.value;
                                    formik.setFieldValue('pay_fast.card_number', val);
                                }}
                            />
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Stack spacing={1} sx={{ flex: 1 }}>
                                <Typography fontWeight={500} variant="body2">Expiry Date</Typography>
                                <TextField
                                    slotProps={{ htmlInput: { maxLength: 5 } }}
                                    placeholder="MM/YY"
                                    size="small"
                                    fullWidth
                                    value={formatExpires(pay_fast.expiry || '')}
                                    error={Boolean(touched.pay_fast?.expiry && errors.pay_fast?.expiry)}
                                    helperText={touched.pay_fast?.expiry && errors.pay_fast?.expiry}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        formik.setFieldValue('pay_fast.expiry', val);
                                    }}
                                />
                            </Stack>
                            <Stack spacing={1} sx={{ flex: 1 }}>
                                <Typography fontWeight={500} variant="body2">CVV</Typography>
                                <TextField
                                    size="small"
                                    slotProps={{ htmlInput: { maxLength: 3 } }}
                                    placeholder="123"
                                    fullWidth
                                    value={pay_fast.cvv || ''}
                                    error={Boolean(touched.pay_fast?.cvv && errors.pay_fast?.cvv)}
                                    helperText={touched.pay_fast?.cvv && errors.pay_fast?.cvv}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        formik.setFieldValue('pay_fast.cvv', val);
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </>
                );
            })()}
            {values.payment_method === 'wallet' && (() => {
                const { wallet = {} } = values;
                return (
                    <Stack spacing={2} sx={{ flex: 1, pt: 1 }}>
                        <RadioGroup row

                            {...getFieldProps('wallet.wallet_type')}

                        >
                            {
                                mobile_wallet.map((wallet) => (
                                    <FormControlLabel
                                        key={wallet.value}
                                        value={wallet.value}
                                        control={<Radio sx={{ transform: 'scale(0.8)' }} />}
                                        label={

                                            <img height={40} width={wallet.value === 'easy_paisa' ? 70 : 50} src={wallet.icon} />

                                        }
                                    />
                                ))
                            }

                        </RadioGroup>

                        <Stack spacing={1}>
                            <Typography fontWeight={500} variant='body2'>Account Number</Typography>
                            <TextField
                                onChange={(e) => formik.setFieldValue('wallet.account_number', e.target.value.replace(/-/g, ''))}
                                value={formatMobileNumber(wallet.account_number)}
                                error={Boolean(touched.wallet?.account_number && errors.wallet?.account_number)}
                                helperText={touched.wallet?.account_number && errors.wallet?.account_number}
                                placeholder='Account Number' fullWidth id="wallet_account_number" size='small' variant="outlined" />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography fontWeight={500} variant='body2'>CNIC No.</Typography>
                            <TextField
                                onChange={(e) => formik.setFieldValue('wallet.cnic_number', e.target.value.replace(/-/g, ''))}
                                value={formatCNIC(wallet.cnic_number)}
                                error={Boolean(touched.wallet?.cnic_number && errors.wallet?.cnic_number)}
                                helperText={touched.wallet?.cnic_number && errors.wallet?.cnic_number}
                                placeholder='CNIC No.' fullWidth id="wallet_password" size='small' variant="outlined" />
                        </Stack>
                    </Stack>
                )
            })()}
            {values.payment_method === 'bank' && (() => {
                const { bank = {} } = values;
                return (
                    <Stack spacing={2} sx={{ flex: 1 }}>
                        <Stack spacing={1}>
                            <Typography fontWeight={500} variant='body2'>Select The bank</Typography>
                            <Autocomplete
                                size={"small"}
                                disableClearable
                                loading={loadingReq}

                                sx={{
                                    width: "100%",
                                    "& .MuiSelect-select": {
                                        background: "white",
                                    }
                                }}
                                id="profile-select"
                                open={openAutoComplete}
                                onOpen={handleOpen}
                                onClose={() => { setOpenAutoComplete(false); setData([]) }}
                                onChange={(e, value) =>
                                    formik.setFieldValue('bank.bank_code', value?.code)
                                }
                                options={data}
                                isOptionEqualToValue={(option, value) => option.title === value.title}
                                getOptionLabel={(option) => option.title}
                                renderInput={params =>
                                    <TextField
                                        {...params}
                                        placeholder='Select Bank'
                                        color={"info"}
                                        error={Boolean(touched.bank?.bank_code && errors.bank?.bank_code)}
                                        helperText={touched.bank?.bank_code && errors.bank?.bank_code}
                                        sx={{ paddingLeft: 0 }}
                                        slotProps={{
                                            input: {
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {(loadingReq) ?
                                                            <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }
                                        }}
                                        variant="outlined"
                                        fullWidth />
                                }
                                renderOption={(props, option, index) => {
                                    return (

                                        <li {...props} key={`${option.title}-${index.index}`}> {/* Ensure unique key */}
                                            {option.title}
                                        </li>
                                    )
                                }}
                            />



                        </Stack>
                        <Stack spacing={1}>
                            <Typography fontWeight={500} variant='body2'>Account Number</Typography>
                            <TextField
                                onChange={(e) => formik.setFieldValue('bank.account_number', e.target.value.replace(/-/g, ''))}
                                value={formatBankAccount(bank.account_number)}
                                error={Boolean(touched.bank?.account_number && errors.bank?.account_number)}
                                helperText={touched.bank?.account_number && errors.bank?.account_number}
                                placeholder='Account Number' fullWidth id="wallet_account_number" size='small' variant="outlined" />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography fontWeight={500} variant='body2'>CNIC No.</Typography>
                            <TextField
                                onChange={(e) => formik.setFieldValue('bank.cnic_number', e.target.value.replace(/-/g, ''))}
                                value={formatCNIC(bank.cnic_number)}
                                error={Boolean(touched.bank?.cnic_number && errors.bank?.cnic_number)}
                                helperText={touched.bank?.cnic_number && errors.bank?.cnic_number}
                                placeholder='CNIC No.' fullWidth id="wallet_password" size='small' variant="outlined" />
                        </Stack>
                    </Stack>
                )
            })()}


            <Typography variant='caption' justifyContent='center' component='div' sx={{ svg: { width: 12, height: 12 }, gap: .3, lineHeight: '44%' }} alignItems='center' display='flex' color='text.secondary'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="-mt-0.5 h-4 w-4">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd">
                    </path>
                </svg>  Payments are secure and encrypted</Typography>
        </Stack>
    )
}

export default PayFastForm
