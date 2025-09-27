'use client'
import Slider from 'react-slick';
import { useRef } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import BannerModal from '@interfaces/banner';
import { getImageUrl } from '@src/utils/getImageUrl';

export default function BannerCarousel({ banners }: { banners: BannerModal[] }) {
    const carouselRef = useRef<any>(null);
    const settings = {
        speed: 300,
        dots: false,
        fade: false,
        arrows: false,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: 'ondemand' as const,
    };

    return (
        <Box className='relative'>
            <Slider ref={carouselRef} {...settings}>
                {(banners.length === 1 ? [...banners, ...banners] : banners).map((item: BannerModal, index: number) => (
                    <Box height={{ xs: 300, md: 380 }} sx={{ borderRadius: 3, overflow: 'hidden', position: 'relative' }} key={index}>
                        <Image
                            src={getImageUrl('banner', item.image)}
                            alt={item.image || 'banner'}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 1200px"
                            priority={index === 0}
                            loading={index === 0 ? 'eager' : 'lazy'}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}
