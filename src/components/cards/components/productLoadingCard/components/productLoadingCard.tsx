import { Box, Skeleton, Stack } from '@mui/material'
import React from 'react'

function ProductLoadingCard() {
    return (
        <Box>
            <Skeleton variant="rounded" width='100%' height={118} />
            <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="80%" />
                <Skeleton width="60%" />
                <Stack direction='row' mt={3} spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Skeleton width='30%' />
                    <Skeleton width='20%' />
                </Stack>
            </Box>
        </Box>
    )
}

export default ProductLoadingCard