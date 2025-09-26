'use client'
import { Box, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image';
import CardStyled from './overrides/cardStyle'
import { getImageUrl } from '@src/utils/getImageUrl';
function CategoryCard({ ...props }) {
    const { data } = props;
    return (
        <CardStyled>
            <CardContent>
                <Stack maxWidth={90} minWidth={100} minHeight={128} mx='auto' alignItems='center'>
                    <Box position='relative' width={70} height={70}>
                        <Image
                            src={data?.img !== "" ? getImageUrl('category', data.img) : "/static/images/placeholder_image.jpg"}
                            alt={data?.name}
                            fill
                            style={{ objectFit: "contain" }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className='mix-blend-multiply'
                            loading="lazy"
                        />
                    </Box>
                    <Stack mt={2}>
                        <Typography sx={{ textWrap: 'auto' }} textAlign='center'>{data?.name.length > 23 ? `${data.name.slice(0, 23)}...` : data?.name}</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </CardStyled>
    )
}

export default CategoryCard