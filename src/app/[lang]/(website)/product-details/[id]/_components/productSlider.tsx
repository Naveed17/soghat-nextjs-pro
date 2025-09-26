'use client'
import Slider from 'react-slick';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Box, Stack } from '@mui/material';
import { getImageUrl } from '@src/utils/getImageUrl';



export default function ProductDetailsCarousel({ ...props }) {
    const { images } = props

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    return (
        <Stack spacing={2} className='product-slider' sx={{
            '.slick-active': {
                '.nav-image-container': {
                    border: 1,
                    borderColor: 'primary.main',
                    borderRadius: 1,

                }
            }
        }}>
            <Slider asNavFor={nav2} ref={(slider1: any) => setNav1(slider1)}
                {...{
                    slidesToShow: 1,
                    swipeToSlide: true,
                    arrows: false,
                    fade: true,
                }}


            >
                {images.map((item: any, index: number) => {
                    return <Box key={index} height={350} position='relative'>
                        <Image
                            src={getImageUrl('product', item?.image)}
                            alt={item}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="lazy"
                        />
                    </Box>
                })}

            </Slider>
            <Slider
                ref={(slider2: any) => setNav2(slider2)}

                {...{
                    asNavFor: nav1,
                    speed: 300,
                    dots: false,
                    fade: false,
                    arrows: false,
                    autoplay: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    variableWidth: true,

                } as any}

            >
                {images.map((item: any, index: number) => {
                    return (
                        <Box className="nav-image-container" sx={{ img: { borderRadius: 1, } }} key={index} position='relative'>
                            <Image height={70} width={70} src={getImageUrl('product', item?.image)} alt={`product-${index}`} />
                        </Box>

                    )
                })}

            </Slider>
        </Stack>
    )



}
