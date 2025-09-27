'use client'
import Slider from 'react-slick';
import { useState, useRef } from 'react';

import { Box } from '@mui/material';
import BannerModal from '@interfaces/banner';


export default function BannerCarousel({ ...props }) {
    const carouselRef = useRef<any>(null);
    const { banners } = props
    const settings = {
        speed: 300,
        dots: false,
        fade: false,
        arrows: false,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className='relative'>
            <Slider ref={carouselRef} {...settings}>
                {(banners.length === 1 ? [...banners, ...banners] : banners).map((item: BannerModal, index: number) => (
                    <Box height={{ xs: 'auto', md: 380 }} key={index} >
                        <Box sx={{ borderRadius: 4, overflow: 'hidden' }} src={`https://khaasdeal.com/bucket/images/soghats/uploads/banners/${item.image}`} alt='banner' component={'img'} width={1} />
                    </Box>
                ))}
            </Slider>



        </div>


    );
}
