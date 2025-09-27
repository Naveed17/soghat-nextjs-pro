'use client'
import Slider from 'react-slick';
import { useRef } from 'react';
import { CategoryCard } from '@src/components/cards';
import { Box } from '@mui/material';


export default function TopCategories({ ...props }) {
    const { categories }: { categories?: any[] } = props
    const carouselRef = useRef<any>(null);

    const settings = {
        speed: 300,
        dots: false,
        fade: false,
        arrows: false,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        variableWidth: true,

    };

    return (
        <div className='relative'>
            <Slider ref={carouselRef} {...settings}>
                {categories?.map((item, index) => (
                    <Box key={index} width={114} pr={1}>
                        <CategoryCard data={{ ...item }} />
                    </Box>
                ))}

            </Slider>
        </div>


    );
}
