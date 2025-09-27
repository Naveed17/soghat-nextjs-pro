// material
import { selectCart } from '@lib/redux/cart';
import { useAppSelector } from '@lib/redux/store';
import {
  Box,
  Card,
  Stack,
  Divider,
  CardHeader,
  Typography,
  CardContent,
} from '@mui/material';


// ----------------------------------------------------------------------


export default function CheckoutSummary() {
  let { total, freight, netTotal } = useAppSelector(selectCart);
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Order Summary"

      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sub Total
            </Typography>
            <Typography variant="subtitle2">{netTotal}</Typography>
          </Stack>



          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Shipping
            </Typography>
            <Typography variant="subtitle2">{freight}</Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {total}
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                (VAT included if applicable)
              </Typography>
            </Box>
          </Stack>


        </Stack>
      </CardContent>
    </Card>
  );
}
