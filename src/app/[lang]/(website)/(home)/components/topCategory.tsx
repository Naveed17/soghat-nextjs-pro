'use client'
import Slider from 'react-slick';
import { useRef } from 'react';
import { CategoryCard } from '@src/components/cards';
import { Box } from '@mui/material';
import { useSettings } from './config';


export default function TopCategories({ ...props }) {
    const { categories }: { categories?: any[] } = props
    const carouselRef = useRef<any>(null);
    const settings = useSettings(categories as any[])

    return (
        <div className='relative' style={{
            whiteSpace: "nowrap"
        }}>
            <Slider ref={carouselRef} {...settings}>
                {categories?.map((item, index) => (
                    <Box sx={{ px: { xs: 1, sm: 0 } }} key={index} maxWidth={{ xs: '100%', sm: 150 }}>
                        <CategoryCard data={{ ...item }} />
                    </Box>
                ))}

            </Slider>
        </div>


    );
}
