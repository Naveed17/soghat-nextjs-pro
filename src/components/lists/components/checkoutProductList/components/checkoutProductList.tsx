
// material
'use client'
import { styled } from '@mui/material/styles';
import {
    Box,
    Table,
    Stack,
    Divider,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    Typography,
    TableContainer,
    IconButton,
    InputBase
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete'
import { getImageUrl } from '@src/utils/getImageUrl';

// ----------------------------------------------------------------------


const ThumbImgStyle = styled(Image)(({ theme }) => ({
    width: 64,
    height: 64,
    objectFit: 'cover',
    marginRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius
}));

// ----------------------------------------------------------------------






export default function ProductList({ ...props }) {
    let { cart, onDelete, onIncrement, onDecrement } = props;
    return (
        <TableContainer sx={{ minWidth: 1 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="left">Price</TableCell>
                        <TableCell align="left">Quantity</TableCell>
                        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>Total Price</TableCell>
                        <TableCell align="right" />
                    </TableRow>
                </TableHead>

                <TableBody>
                    {cart?.map((product: any) => {
                        const { id, name, variant, image, warehouse_stock } = product;
                        return variant.map((v: any, idx: number) => {
                            if (v.quantity === 0) return null;
                            return (
                                <TableRow key={v.id}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ThumbImgStyle width={60} height={60} alt="product image" src={getImageUrl('product', image)}
                                            />
                                            <Stack>
                                                <Typography noWrap lineHeight={1} fontWeight={500} variant="body2" sx={{ maxWidth: 240 }}>
                                                    {name}
                                                </Typography>
                                                <Typography noWrap variant="body2" sx={{ maxWidth: 240, color: 'primary.main' }}>
                                                    {warehouse_stock[idx]?.warehouse_name}
                                                </Typography>
                                                <Typography noWrap variant="caption" sx={{ maxWidth: 240, color: 'text.secondary' }}>
                                                    ({v.value} {" "} {v.unit})

                                                </Typography>


                                            </Stack>
                                        </Box>
                                    </TableCell>

                                    <TableCell align="left">
                                        {v?.sell_price}
                                    </TableCell>

                                    <TableCell align="left">
                                        <Stack direction='row' alignItems='center' spacing={1}>
                                            {/* add counter */}
                                            <IconButton onClick={() => onDecrement(id, v.id)} sx={{ borderRadius: 1, bgcolor: 'grey.200', p: 0.25 }} size='small'>
                                                <RemoveIcon sx={{ fontSize: 16 }} />
                                            </IconButton>

                                            <InputBase sx={{ width: 40, input: { textAlign: 'center', fontSize: 12 } }} readOnly value={v.quantity} />
                                            <IconButton onClick={() => onIncrement(id, v.id)} sx={{ borderRadius: 1, bgcolor: 'grey.200', p: 0.25 }} size='small'>
                                                <AddIcon sx={{ fontSize: 16 }} />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="right">{v?.sell_price * v.quantity}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size='small' onClick={() => onDelete(id, v.id)}>
                                            <DeleteIcon fontSize='small' />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )

                        })

                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
