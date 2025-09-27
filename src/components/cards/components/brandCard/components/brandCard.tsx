'use client'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import { getImageUrl } from '@src/utils/getImageUrl'
function BrandCard({ ...props }) {
    const { brand } = props;
    const router = useRouter();
    return (
        <Card
            sx={{
                borderRadius: 0, '&:hover': {
                    img: {
                        transform: 'scale(1.05)'

                    }
                }
            }}
        >
            <CardActionArea
                onClick={() => router.push(`/listing/brands/${(brand.name).replace(/ /g, "-")}`)}
                sx={{ height: 1 }}>
                <CardMedia
                    sx={{ textAlign: 'center', pt: { xs: 1.5, md: 4 } }}
                >
                    <Image style={{ transition: 'all .3s' }} width={52} height={52} alt={brand.name} src={getImageUrl('brand', brand.img)} />
                </CardMedia>
                <CardContent sx={{ p: { xs: 1, md: 2 } }}>
                    <Typography textAlign='center' fontWeight={600} gutterBottom variant="body1">
                        {brand.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card >

    )
}




export default BrandCard