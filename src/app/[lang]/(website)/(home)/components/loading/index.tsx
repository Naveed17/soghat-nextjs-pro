import { Skeleton, Stack, Grid2, Box } from '@mui/material';

export function BannerSkeleton() {
  return <Skeleton variant="rectangular" sx={{ borderRadius: 3, height: { xs: 300, md: 380 } }} />;
}

export function CategorySkeleton() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="text" width={200} height={40} />
      <Grid2 container spacing={2}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid2 size={{ xs: 4, md: 2 }} key={i}>
            <Stack alignItems="center" spacing={1}>
              <Skeleton variant="circular" width={80} height={80} />
              <Skeleton variant="text" width={60} />
            </Stack>
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}

export function ProductSliderSkeleton() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="text" width={200} height={40} />
      <Grid2 container spacing={2}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid2 size={{ xs: 6, md: 3 }} key={i}>
            <Stack spacing={1}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
            </Stack>
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}

export function BrandsSkeleton() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="text" width={200} height={40} />
      <Box sx={{
        display: 'grid',
        gap: 1,
        gridTemplateColumns: {
          xs: 'repeat(3, 1fr)',
          md: 'repeat(6, 1fr)'
        }
      }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={100} sx={{ borderRadius: 1 }} />
        ))}
      </Box>
    </Stack>
  );
}