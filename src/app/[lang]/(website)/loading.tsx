'use client'
import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
// material
import { alpha, styled, } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useAppSelector } from '@lib/redux/store';
import { getImageUrl } from '@src/utils/getImageUrl';
import Image from 'next/image';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    height: '100vh',
    position: 'fixed',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(theme.palette.background.default, 1),
    zIndex: 99999999999,
    top: 0,
    svg: {
        height: 90,
        width: 90,
        path: {
            fill: theme.palette.primary.main
        }
    }
}));

// ----------------------------------------------------------------------



export default function LoadingScreen({ ...other }) {
    const { websiteContent } = useAppSelector(state => state.websiteContent);
    const nope = getImageUrl('baseUrl', '/assets/website/images/nope.svg');
    useEffect(() => {
        // hide body scroll on mount
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    return (
        <>

            <RootStyle {...other}>
                <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 360 }}
                    transition={{
                        duration: 2,
                        ease: 'easeInOut',
                        repeatDelay: 1,
                        repeat: Infinity
                    }}
                >
                    <Image
                        height={50}
                        width={100}
                        alt="company logo"
                        src={websiteContent ? getImageUrl('baseUrl', `/${websiteContent?.header_logo}`) : nope}
                        priority
                    />
                </motion.div>

                <Box
                    component={motion.div}
                    animate={{
                        scale: [1.2, 1, 1, 1.2, 1.2],
                        rotate: [270, 0, 0, 270, 270],
                        opacity: [0.25, 1, 1, 1, 0.25],
                        borderRadius: ['25%', '25%', '50%', '50%', '25%']
                    }}
                    transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
                    sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '25%',
                        position: 'absolute',
                        border: (theme) => `solid 3px ${alpha(theme.palette.primary.main, 0.24)}`
                    }}
                />

                <Box
                    component={motion.div}
                    animate={{
                        scale: [1, 1.2, 1.2, 1, 1],
                        rotate: [0, 270, 270, 0, 0],
                        opacity: [1, 0.25, 0.25, 0.25, 1],
                        borderRadius: ['25%', '25%', '50%', '50%', '25%']
                    }}
                    transition={{
                        ease: 'linear',
                        duration: 3.2,
                        repeat: Infinity
                    }}
                    sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '25%',
                        position: 'absolute',
                        border: (theme) => `solid 8px ${alpha(theme.palette.primary.main, 0.24)}`
                    }}
                />
            </RootStyle>
        </>
    );
}
