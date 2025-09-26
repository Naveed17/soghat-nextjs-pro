'use client'
import { filter, sum } from 'lodash';

import RouterLink from 'next/link';
// material
import { Grid2 as Grid, Card, Button, CardHeader, Typography, Container, Box } from '@mui/material';
import { useAppDispatch } from '@lib/redux/store';


//
import { Scrollbar } from '@components/scrollbar';
import { EmptyContent } from '@components/emptyContent';
import { CheckoutProductList } from '@components/lists';
import { useAppSelector } from '@lib/redux/store';
import { selectCart, setCart, setTotal, setFreight, setNetTotal, setDiscount } from '@lib/redux/cart';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { CheckoutSummaryCard } from '@components/cards';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { calculateCartTotals } from '@src/utils/calculateCartTotals';
// ----------------------------------------------------------------------

export default function CheckoutCart() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    let { cart } = useAppSelector(selectCart);
    const isEmptyCart = cart.length === 0;
    const handleDeleteCart = (productId: string, vId: any) => {
        const updateCart = cart
            .map((item) => {
                if (item.id === productId) {
                    // Filter out the specific variant
                    const updatedVariants = item.variant.filter((v: any) => v.id !== vId);

                    // Return null if no variants remain; otherwise, update the item
                    return updatedVariants.length > 0
                        ? { ...item, variant: updatedVariants }
                        : null;
                }
                return item;
            })
            .filter(Boolean); // Remove any null values (products without variants)

        dispatch(setCart(updateCart as any));
    };

    const handleIncrement = (productId: any, vId: any) => {
        const updateCart = cart.map((item) => {
            if (item.id === productId) {
                return {
                    ...item,
                    variant:
                        item.variant.map((v: any) => {
                            if (v.id === vId) {
                                return {
                                    ...v,
                                    quantity: v.quantity + 1
                                }
                            }
                            return v;
                        })

                };
            }
            return item;
        });
        dispatch(setCart(updateCart as any));
    };
    const handleDecrement = (productId: string, vId: any) => {

        const updateCart = cart.map((item) => {
            if (item.id === productId) {
                return {
                    ...item,
                    variant:
                        item.variant.map((v: any) => {
                            if (v.id === vId) {
                                return {
                                    ...v,
                                    quantity: v.quantity > 1 ? v.quantity - 1 : 1
                                }
                            }
                            return v;
                        })

                };
            }
            return item;
        });
        dispatch(setCart(updateCart as any));

    };
    useEffect(() => {
        // remove all the variants which quantity is 0
        const updateCart = cart.map((item) => {
            return {
                ...item,
                variant: item.variant.filter((v: any) => v.quantity > 0)
            };
        }).filter((item) => item.variant.length > 0);
        dispatch(setCart(updateCart as any));

    }, []);
    const { subtotal, shippingFees, discount, total } = calculateCartTotals(cart);
    useEffect(() => {
        dispatch(setTotal(total as any));
        dispatch(setFreight(shippingFees as any));
        dispatch(setNetTotal(subtotal as any));
        dispatch(setDiscount(discount as any));
    }, [subtotal])
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card sx={{ mb: 3 }}>
                        <CardHeader
                            title={
                                <Typography variant="h6">
                                    Cart
                                </Typography>
                            }
                            sx={{ mb: 3 }}
                        />

                        {!isEmptyCart ? (
                            <Scrollbar>
                                <CheckoutProductList
                                    onDelete={handleDeleteCart}
                                    cart={cart}
                                    onIncrement={handleIncrement}
                                    onDecrement={handleDecrement}
                                />
                            </Scrollbar>
                        ) : (
                            <EmptyContent
                                title="Cart is empty"
                                description="Look like you have no items in your shopping cart."
                                img="/static/images/empty_basket.jpg"
                            />
                        )}
                    </Card>

                    <Button
                        color="inherit"
                        component={RouterLink}
                        href={'/'}
                        startIcon={<KeyboardBackspaceIcon />}
                    >
                        Continue Shopping
                    </Button>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <CheckoutSummaryCard />
                    <Button onClick={() => router.push("/checkout")} fullWidth size="large" type="submit" variant="contained" disabled={isEmptyCart}>
                        Check Out
                    </Button>
                </Grid>
            </Grid>
            <Box mt={3} />
        </Container>
    );
}
