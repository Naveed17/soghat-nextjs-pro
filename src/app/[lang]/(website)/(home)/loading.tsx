import { Container, Stack } from '@mui/material';
import { BannerSkeleton, CategorySkeleton, ProductSliderSkeleton, BrandsSkeleton } from './components/loading';

export default function HomeLoading() {
  return (
    <Stack component='section' pb={5} overflow='hidden'>
      <Container maxWidth='lg'>
        <Stack sx={{ gap: 3 }} mt={4}>
          <BannerSkeleton />
          <CategorySkeleton />
          <ProductSliderSkeleton />
          <ProductSliderSkeleton />
          <BrandsSkeleton />
        </Stack>
      </Container>
    </Stack>
  );
}