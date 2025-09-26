'use client'
import React, { useEffect, useRef } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { Alert, AlertTitle, AppBar, Badge, Box, Button, Card, CardContent, Container, Divider, Grid2 as Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Toolbar, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@lib/redux/store'
import CheckIcon from '@themes/overrides/icons/checkIcon'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { OrderProductList } from '@components/lists'
import { CheckoutSummaryCard } from '@components/cards'
import InfoIcon from '@mui/icons-material/Info';
import { resetCart } from '@lib/redux/cart'
import { setOrder } from '@lib/redux/order'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { isEmpty } from 'lodash';
import useRouteChangeHandler from '@src/hooks/useEmptyBasket'
function OrderComplete() {
    const searchParams = useSearchParams();
    const router = useRouter()
    const { order } = useAppSelector(state => state.order);
    const { cart } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const order_id = searchParams.get('order_id');
    const orderNotMatched = order && order.order_id !== order_id
    const { width, height } = useWindowSize();
    const calculateCartLength = (cart: any[]) => {
        return cart.reduce((total, item) => {
            return total + item.variant.filter((variant: any) => variant.quantity > 0).length;
        }, 0);
    };
    const cartLength = calculateCartLength(cart);

    const empty_basket = () => {
        dispatch(resetCart());
        dispatch(setOrder({} as any));


    }
    const handleClick = () => {
        router.push('/');
    }

    useRouteChangeHandler(empty_basket)
    if (!order_id || isEmpty(order) || orderNotMatched) {
        return (
            <Container>
                <Paper sx={{ p: 5, textAlign: 'center', mb: 3, boxShadow: theme => theme.customShadows.primary }}>
                    <Typography variant='h3' color='error'>Order not found</Typography>
                    <Button onClick={handleClick} variant='contained' color='error' sx={{ mt: 3 }}>Go to Home</Button>
                </Paper>
            </Container>
        )
    }
    return (
        <>

            <Container>
                <Confetti
                    width={width - 100}
                    height={height}
                    numberOfPieces={1000}
                    recycle={false}
                    initialVelocityY={20}

                />
                <Card sx={{ maxWidth: 900, mx: 'auto', mt: 5, mb: 10, boxShadow: theme => theme.customShadows.primary }}>
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, lg: 8 }}>
                                <Stack spacing={3}>
                                    <Typography variant='h5'>
                                        Order Confirmed
                                    </Typography>
                                    <Stack sx={{ svg: { width: 32, height: 32 } }} direction='row' spacing={1} alignItems='center'>
                                        <CheckIcon width="32" height="32" />
                                        <Stack>
                                            <Typography variant='body2' color='text.secondary'>
                                                Order #{order?.order_id}
                                            </Typography>
                                            <Typography variant='subtitle2'>
                                                Thank you {order?.buyer?.name}!
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <Alert sx={{ boxShadow: 'none', borderColor: 'divider', color: 'text.primary', '.MuiAlert-icon': { display: 'none' } }} variant='outlined'>
                                        <AlertTitle color='text.primary'>Order Updates</AlertTitle>
                                        You will receive order and shipping updates via email
                                    </Alert>
                                    <Stack spacing={2}>
                                        <Paper sx={{ boxShadow: 'none', border: 1, borderColor: 'divider', borderRadius: 2 }}>
                                            <Stack p={1} bgcolor={'grey.100'} sx={{ borderRadius: 2 }}>
                                                <Typography variant='subtitle2'>Contact Info</Typography>
                                            </Stack>
                                            <Divider />
                                            <List sx={{ '.MuiListItemIcon-root': { minWidth: 64 } }}>
                                                <ListItem sx={{ py: 0, fontSize: 12 }}>
                                                    <ListItemIcon sx={{ mr: 2 }}>
                                                        Address :
                                                    </ListItemIcon>
                                                    <ListItemText primaryTypographyProps={{ fontSize: 12 }} primary={order?.delivery_address ?? 'null'} />
                                                </ListItem>
                                                <ListItem sx={{ py: 0, fontSize: 12 }}>
                                                    <ListItemIcon sx={{ mr: 2 }}>
                                                        Phone :
                                                    </ListItemIcon>
                                                    <ListItemText primaryTypographyProps={{ fontSize: 12 }} primary={order?.buyer?.phone ?? 'null'} />
                                                </ListItem>
                                                <ListItem sx={{ py: 0, fontSize: 12 }}>
                                                    <ListItemIcon sx={{ mr: 2 }}>
                                                        Email :
                                                    </ListItemIcon>
                                                    <ListItemText primaryTypographyProps={{ fontSize: 12 }} primary={order?.buyer?.email ?? 'null'} />
                                                </ListItem>
                                            </List>


                                        </Paper>
                                        <Paper sx={{ boxShadow: 'none', border: 1, borderColor: 'divider', borderRadius: 2 }}>
                                            <Stack p={1} bgcolor={'grey.100'} sx={{ borderRadius: 2 }}>
                                                <Typography variant='subtitle2'>Payment Info</Typography>
                                            </Stack>
                                            <Divider />
                                            <List sx={{ '.MuiListItemIcon-root': { minWidth: 110 } }}>
                                                <ListItem sx={{ py: 0, fontSize: 12 }}>
                                                    <ListItemIcon sx={{ mr: 2 }}>
                                                        Payment Method :
                                                    </ListItemIcon>
                                                    <ListItemText primaryTypographyProps={{ fontSize: 12 }} primary={order?.payment_method ?? 'COD'} />
                                                </ListItem>
                                                {order?.transaction_id &&
                                                    <ListItem sx={{ py: 0, fontSize: 12 }}>
                                                        <ListItemIcon sx={{ mr: 2 }}>
                                                            Transaction ID :
                                                        </ListItemIcon>
                                                        <ListItemText primaryTypographyProps={{ fontSize: 12 }} primary={order?.transaction_id ?? 'Nill'} />
                                                    </ListItem>
                                                }
                                                <ListItem sx={{ py: 0, fontSize: 12 }}>
                                                    <ListItemIcon sx={{ mr: 2 }}>
                                                        Order Type :
                                                    </ListItemIcon>
                                                    <ListItemText primaryTypographyProps={{ fontSize: 12, textTransform: 'capitalize' }} primary={order?.order_type ?? 'Unpaid'} />
                                                </ListItem>
                                            </List>


                                        </Paper>
                                    </Stack>

                                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                        <Stack sx={{ a: { fontSize: 10, color: 'primary.main', textDecoration: 'underline' } }} direction='row' alignItems='center' spacing={.5}>
                                            <InfoIcon sx={{ fontSize: 14 }} />
                                            <Typography color="text.secondary" variant='caption'>
                                                Need help? {" "}
                                                <Link href='/support/contact-us'>
                                                    Contact Us
                                                </Link>
                                            </Typography>

                                        </Stack>
                                        <Button variant='contained' onClick={handleClick}>Continue Shopping</Button>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 12, lg: 4 }}>
                                <Stack direction='row' alignItems='center' spacing={.5}>
                                    <ShoppingBagOutlinedIcon />
                                    <Typography variant='subtitle1'>Your Order</Typography>
                                    <Badge sx={{ '.MuiBadge-badge': { position: 'static', transform: 'none', border: 2, borderColor: 'white', minWidth: 20, p: 0 } }} badgeContent={cartLength} color="primary" />
                                </Stack>
                                <Stack spacing={2} mt={1}>
                                    <Stack mt={3} maxHeight={200} overflow='auto' pr={1}>
                                        <OrderProductList />
                                    </Stack>
                                    <Box sx={{ '.MuiPaper-root': { boxShadow: 'none', '.MuiCardHeader-root': { px: 0 }, '.MuiCardContent-root': { px: 0 } } }}>
                                        <CheckoutSummaryCard />
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

            </Container>
        </>
    )
}

export default OrderComplete