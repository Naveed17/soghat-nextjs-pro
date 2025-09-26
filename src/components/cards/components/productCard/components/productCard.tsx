'use client'
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Stack, Tooltip, Typography } from '@mui/material';
import ProductCardStyled from './overrides/productCardStyle';
import React, { useCallback, useEffect, useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RemoveRedEyeOutlinedIcon from '@themes/overrides/icons/viewIcon';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/navigation';
import { getMinPrice } from '@src/utils/getMinPrice';
import toast from 'react-hot-toast';
import { getImageUrl } from '@src/utils/getImageUrl';
import ImageBlur from '@src/utils/blurImage';
import { wishList as wishListApi } from '@src/actions';
import { setWishlist } from '@lib/redux/wishlist';
import { useAppDispatch, useAppSelector } from '@lib/redux/store';
import { LoadingButton } from '@mui/lab';
import FavoriteBorderOutlinedIcon from '@themes/overrides/icons/favorite';

function ProductCard({ product, ...props }: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const { wishlist } = useAppSelector((state) => state.wishlist);
    const hasProduct = wishlist.find((item) => item.product_id === product?.id);
    const updateWishlist = async (product: any, action: string) => {
        setLoading(true);
        const session = await fetch('/api/auth/session');
        const data = await session.json();
        const user = data?.user?.user ?? null;
        if (!user) {
            toast.error('Please login to add to wishlist');
            setLoading(false);
            return;
        }
        const response = await wishListApi({ product_id: product.id, user_id: user.id, action });
        if (response?.Boolean) {
            toast.success(
                action === 'add' ? 'Added to wishlist' : 'Removed from wishlist'
            );

            // Fetch updated wishlist and dispatch to Redux
            const updatedWishlist = await wishListApi({ user_id: user.id, action: 'view' });
            if (updatedWishlist?.Boolean) {
                dispatch(setWishlist(updatedWishlist.wishlist));
            } else if (updatedWishlist.message === "No products found in the wishlist") {
                dispatch(setWishlist([] as any));
            }
        } else {
            toast.error('Something went wrong');
        }

        setLoading(false);
    };

    // Get minimum price of product variants
    const callbackGetMinPrice = useCallback(getMinPrice, [product]);

    return (
        <ProductCardStyled>
            <CardMedia
                onClick={() => router.push(`/product-details/${product?.id}`)}
                sx={{ cursor: 'pointer', position: 'relative', height: 200 }}
            >
                <ImageBlur
                    src={getImageUrl('product', product?.image)}
                    alt={product?.name || 'Product image'}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    loading="lazy"
                />


                <Tooltip
                    arrow
                    placement="top"
                    title={hasProduct ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <LoadingButton
                        disabled={loading}
                        loading={loading}
                        className='btn-wishlist'
                        onClick={async (e) => {
                            e.stopPropagation();
                            if (hasProduct) {
                                await updateWishlist(product, 'del');
                            } else {
                                await updateWishlist(product, 'add');
                            }
                        }}
                    >
                        {loading ? (
                            <Box minWidth={24} />
                        ) : hasProduct ? (
                            <FavoriteIcon className="fav_icon filled" fontSize="small" color="error" />
                        ) : (
                            <FavoriteBorderOutlinedIcon className="fav_icon" fontSize="small" />
                        )}
                    </LoadingButton>

                </Tooltip>

            </CardMedia>
            <CardContent
                onClick={() => router.push(`/product-details/${product?.id}`)}
                sx={{ cursor: 'pointer' }}
            >
                <Stack spacing={0.5}>
                    <Typography
                        sx={{
                            display: 'box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            lineHeight: '1.5em',
                            height: '3em',
                        }}
                        gutterBottom variant="subtitle1">
                        {product?.name?.length > 30
                            ? `${product?.name?.slice(0, 30)}...`
                            : product?.name}
                    </Typography>
                    <Typography
                        sx={{
                            display: 'box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                            lineHeight: '1.5em',
                            height: '1.5em',
                        }}
                        variant="body1" color="text.secondary">
                        {product?.user?.name?.length > 25
                            ? `${product?.user?.name.slice(0, 25)}...`
                            : product?.user?.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {product?.user?.city}
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions>
                <Typography color="primary" variant="subtitle1">
                    Rs {callbackGetMinPrice(product?.variant)}
                </Typography>
                <Button onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/product-details/${product?.id}`);
                }} variant="contained" size="small">
                    <ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />
                </Button>
            </CardActions>
        </ProductCardStyled>
    );
}

export default ProductCard;
