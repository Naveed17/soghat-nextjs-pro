'use client'
import Slider from 'react-slick';
import { useState, useRef } from 'react';
import { ProductCard } from '@src/components/cards';
import { Box, IconButton, Stack, useTheme } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function ProductSlider({ ...props }) {
    const carouselRef = useRef<any>(null);
    const { direction } = useTheme();
    console.log(direction)
    const { products } = props
    const settings = {
        speed: 300,
        dots: false,
        fade: false,
        arrows: true,
        autoplay: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        rtl: direction === 'rtl' ? true : false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                    rtl: direction === 'rtl' ? true : false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    rtl: direction === 'rtl' ? true : false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rtl: direction === 'rtl' ? true : false,
                }
            }
        ]
    };

    return (
        <Stack position='relative'>
            <Slider ref={carouselRef} {...settings}>
                {products.map((product: any, index: number) => (
                    <Box px={.4} key={index}>
                        <ProductCard product={product} />
                    </Box>
                ))}

            </Slider>

            <IconButton sx={{ bgcolor: 'white', border: 1, borderColor: 'divider', position: 'absolute', left: -14, top: '50%', transform: 'translateY(-50%)' }} size='small' onClick={() => carouselRef.current.slickPrev()}>
                <NavigateNextIcon sx={{ transform: 'rotate(180deg)' }} fontSize='small' />
            </IconButton>
            <IconButton sx={{ bgcolor: 'white', border: 1, borderColor: 'divider', position: 'absolute', right: -14, top: '50%', transform: 'translateY(-50%)' }} size="small" onClick={() => carouselRef.current.slickNext()}>
                <NavigateNextIcon fontSize='small' />
            </IconButton>

        </Stack>


    );
}
