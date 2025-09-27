'use client'
import { useAppSelector } from '@lib/redux/store';
import { Chip, Stack, styled, Typography } from '@mui/material';
import React from 'react'
import Image from 'next/image';
import { getImageUrl } from '@src/utils/getImageUrl';

const ThumbImgStyle = styled(Image)(({ theme }) => ({
    width: 64,
    height: 64,
    objectFit: 'cover',
    marginRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius
}));
function OrderProductList() {
    const { cart } = useAppSelector(state => state.cart);
    return (
        cart?.map((product: any) => {
            const { name, variant, image, } = product;
            return variant.map((v: any) => {
                if (v.quantity === 0) return null;
                return (
                    <Stack py={2} borderBottom={1} borderColor='divider' key={v.id} direction='row' spacing={1}>
                        <ThumbImgStyle width={60} height={60} alt="product image" src={getImageUrl('product', image)}
                        />
                        <Stack width={1}>
                            <Typography fontWeight={500}>
                                {name}
                            </Typography>
                            <Stack mt="auto" direction='row' justifyContent='space-between' alignItems='center'>
                                <Chip sx={{ borderRadius: 1, height: 17, '.MuiChip-label': { px: .5, fontSize: 10, fontWeight: 500 } }} label={`x ${v.quantity}`} variant="outlined" />
                                <Typography variant='body2' fontWeight={600}>RS {v?.sell_price}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                )
            })
        }))

}

export default OrderProductList