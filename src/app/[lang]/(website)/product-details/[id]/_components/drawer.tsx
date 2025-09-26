'use client'
import * as React from 'react';
import { Button, Card, CardActions, CardContent, Divider, Drawer, IconButton, InputBase, List, ListItem, Stack, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useAppDispatch, useAppSelector } from '@lib/redux/store';
import { selectCart, setCart } from '@lib/redux/cart';
import { map, uniqBy } from 'lodash';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import EastIcon from '@mui/icons-material/East';
interface Cart {
    name: string,
    id: number;
    image: string;
    variant: any[];
    warehouse_stock: any[]
}
export default function CartDrawer({ ...props }) {
    const dispatch = useAppDispatch();
    const router = useRouter()
    let { cart } = useAppSelector(selectCart);
    const { open, toggleDrawer, product } = props;
    const [initialCart, setInitialCart] = React.useState<Cart>()
    const handleIncrease = (variantIdx: number) => {
        const updatedCart = initialCart?.variant.map((variant: any, idx: number) => {
            if (idx === variantIdx) {
                return {
                    ...variant,
                    quantity: variant.quantity + 1
                };
            }
            return variant;
        });
        setInitialCart({
            ...initialCart,
            variant: updatedCart
        } as Cart);


    };
    const handleDecrease = (variantIdx: any) => {
        const updatedCart = initialCart?.variant.map((variant: any, idx: number) => {
            if (idx === variantIdx) {
                return {
                    ...variant,
                    quantity: variant.quantity > 0 ? variant.quantity - 1 : 0
                };
            }
            return variant;
        });
        setInitialCart({
            ...initialCart,
            variant: updatedCart
        } as Cart);
    };
    function addToCart(product: any) {
        const existingProduct = cart.find((item: any) => item.id === product.id);
        if (existingProduct) {
            const updatedCart = cart.map((item: any) => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        variant: uniqBy([...product.variant], 'id')
                    };
                }
                return item;
            });
            dispatch(setCart(updatedCart as any));
            toast.success('Product added to cart');
        } else {
            dispatch(setCart([...cart, product] as any));
            toast.success('Product added to cart');
        }

    }
    React.useEffect(() => {
        const productInCart = cart.find((item: any) => item.id === product.id);
        if (productInCart) {
            // Create a shallow copy of the product to make it mutable
            const productInCartCopy = { ...productInCart };

            // Ensure productInCartCopy.variant is an array (handles edge cases for single variant)
            productInCartCopy.variant = Array.isArray(productInCart.variant) ? [...productInCart.variant] : [];

            // Ensure product.variant is also an array
            const productVariants = Array.isArray(product.variant) ? product.variant : [];

            // Find any missing variants that need to be added
            const missingVariants = productVariants.filter((variant: any) => {
                return !productInCartCopy.variant.find((item: any) => item.id === variant.id);
            });
            if (missingVariants.length > 0) {
                // Add missing variants with quantity: 0
                missingVariants.forEach((variant: any) => {
                    productInCartCopy.variant.push({
                        ...variant,
                        quantity: 0,
                    });
                });

                // Update the cart with the modified product
                setInitialCart(productInCartCopy);
            } else {
                setInitialCart(productInCartCopy);
            }

            return;
        }


        const { desc,
            brand_id,
            find_brand,
            cat_main_id,
            cat_sub_id,
            cat_sub_sub_id,
            city,
            created_at,
            feature,
            features,
            level,
            images,
            status,
            type,
            updated_at,
            user,
            user_id,
            website,
            ...rest } = product;
        rest.variant = rest.variant.map((variant: any) => {
            return {
                ...variant,
                quantity: 0
            };
        });
        setInitialCart(rest);
    }, [product])
    const itemSubtotal = React.useMemo(() => {
        return initialCart?.variant?.reduce((acc: any, arr: any) => {
            return acc + arr.sell_price * arr.quantity


        }, 0);
    }, [initialCart]);
    const shippingTotal = 0
    const subtotal = itemSubtotal + shippingTotal;
    const DrawerContent = (
        <Stack height={1}>
            <Stack p={2} pt={1}>
                <Typography fontWeight={500} variant='subtitle1'>Minimum order quantity: 1 piece</Typography>
                <Typography
                    sx={{
                        display: 'box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        lineHeight: '1.5em',
                        height: '1.5em',
                    }}
                    fontWeight={600} variant='h4'>
                    {initialCart?.name}
                </Typography>
                <Divider sx={{ mt: 2 }} />
                <Stack mt={1} >
                    <Typography variant='subtitle1'>Select variations and quantity</Typography>
                    <Stack mt={2} overflow='auto' maxHeight={180} spacing={3}>
                        {initialCart?.variant?.map((vari: any, idx: number) =>
                            <Stack key={vari.id} maxWidth='90%' direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography width={45}>
                                    {vari.value} {" "}
                                    {vari.unit}
                                </Typography>
                                <Stack direction='row' alignItems='center' spacing={1}>
                                    {/* add counter */}
                                    <IconButton onClick={() => handleDecrease(idx)} sx={{ borderRadius: 1, bgcolor: 'grey.200' }} size='small'>
                                        <RemoveIcon sx={{ fontSize: 16 }} />
                                    </IconButton>

                                    <InputBase sx={{ width: 40, input: { textAlign: 'center' } }} readOnly value={vari.quantity || 0} />
                                    <IconButton onClick={() => handleIncrease(idx)} sx={{ borderRadius: 1, bgcolor: 'grey.200' }} size='small'>
                                        <AddIcon sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </Stack>
                                <Typography>
                                    Rs   {vari.sell_price}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>

                </Stack>
            </Stack>
            <Card sx={{ mt: 'auto' }}>
                <CardContent>
                    <List disablePadding>
                        <ListItem disablePadding>
                            <Typography fontWeight={600}>Item Subtotals:</Typography>
                            <Typography ml="auto">
                                {itemSubtotal}
                            </Typography>
                        </ListItem>
                        <ListItem disablePadding sx={{ my: 1 }}>
                            <Typography fontWeight={600}>Shipping total:</Typography>
                            <Typography ml="auto">
                                {shippingTotal}
                            </Typography>
                        </ListItem>
                        <ListItem disablePadding>
                            <Typography variant='h6'>Subtotal:</Typography>
                            <Typography ml="auto">
                                {subtotal}
                            </Typography>
                        </ListItem>
                    </List>
                </CardContent>
                <CardActions>
                    <Button disabled={itemSubtotal === 0} onClick={() => addToCart(initialCart)} sx={{ textWrapMode: 'nowrap' }} fullWidth startIcon={<ShoppingCartOutlinedIcon />} variant='contained'>Add to Cart</Button>
                    <Button disabled={itemSubtotal === 0} onClick={() => router.push('/cart')} fullWidth variant='contained'>Buy Now</Button>
                </CardActions>
            </Card>
        </Stack>
    );
    React.useEffect(() => {
        if (open) {
            document.body.classList.add("lock-scrollbar");


        } else {
            document.body.classList.remove("lock-scrollbar");
        }

        // Cleanup when the component unmounts
        return () => {
            document.body.classList.remove("lock-scrollbar");
        };
    }, [open]);
    return (
        <div>

            <Drawer
                PaperProps={{
                    sx: {
                        maxWidth: 400,
                        width: '100%',
                        zIndex: 999999
                    }
                }} open={open} anchor='right'

                onClose={toggleDrawer(false)}>
                <Toolbar sx={{ '&.MuiToolbar-root': { minHeight: 0 } }}>
                    <IconButton sx={{ mt: 1 }} size='small' onClick={toggleDrawer(false)}>
                        <EastIcon />
                    </IconButton>
                </Toolbar>
                {DrawerContent}
            </Drawer>
        </div>
    );
}
