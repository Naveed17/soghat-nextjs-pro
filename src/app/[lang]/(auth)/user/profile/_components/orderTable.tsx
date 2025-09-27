'use client'
import { Paper, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Box, Stack, Avatar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Label } from '@components/label';
interface Column {
    id: string;
    label: string;
    align?: 'right' | 'left' | 'center';
    width?: number

}
const columns: readonly Column[] = [
    { id: 'order_id', label: 'Order Id', align: 'center', width: 150 },
    { id: 'product', label: 'Product', align: 'left' },
    { id: 'date', label: 'Date', align: 'left' },
    { id: 'items', label: 'Items', align: 'left' },
    { id: 'price', label: 'Price', align: 'left' },
    { id: 'status', label: 'Status', align: 'right' },


];
export default function GFTApprovals() {
    function stringAvatar(name: string) {
        if (!name) return { children: "" };
        const parts = name.split(" ");
        if (parts.length > 1) {
            return { children: `${parts[0][0]}${parts[1][0]}`.toUpperCase() };
        } else {
            return { children: `${name[0]}${name[name.length - 1]}`.toUpperCase() };
        }
    }
    const [rows, setRows] = useState([
        {
            id: '1',
            order_id: '1',
            product: 'Product 1',
            date: '2021-10-10',
            items: 1,
            price: 100,
            status: 'Pending',
            approval_status: 'Pending',

        },
        {
            id: '2',
            order_id: '2',
            product: 'Product 2',
            date: '2021-10-10',
            items: 1,
            price: 100,
            status: 'Pending',
            approval_status: 'Pending',

        },
        {
            id: '3',
            order_id: '3',
            product: 'Product 3',
            date: '2021-10-10',
            items: 1,
            price: 100,
            status: 'Pending',
            approval_status: 'Pending',
        },
        {
            id: '4',
            order_id: '4',
            product: 'Product 4',
            date: '2021-10-10',
            items: 1,
            price: 100,
            status: 'Pending',
            approval_status: 'Pending',
        }

    ]);
    return (
        <React.Fragment>
            <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 3, border: 1, borderColor: 'divider' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column: Column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ width: column.width, fontWeight: 700, fontSize: 14 }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .map((row, idx) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column: Column) => {
                                                const value =
                                                    column.id === 'status' ? (
                                                        <Label color={
                                                            row.approval_status === 'Approved' ? 'success' : row.approval_status === 'Rejected' ? 'error' : 'warning'
                                                        } variant='filled'>
                                                            {row.approval_status}
                                                        </Label>
                                                    ) : column.id === 'product' ? (
                                                        <Stack direction='row' spacing={1}>
                                                            <Avatar variant='rounded' {...stringAvatar(row[column.id as keyof typeof row] as string)} sx={{ fontSize: 14, fontWeight: 700 }} />
                                                            <Stack>
                                                                <Typography fontWeight={500}>
                                                                    {row[column.id as keyof typeof row]}
                                                                </Typography>
                                                                <Typography variant='caption' color="text.secondary">
                                                                    {row['product']}
                                                                </Typography>
                                                            </Stack>
                                                        </Stack>
                                                    ) : (
                                                        row[column.id as keyof typeof row]
                                                    );
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}


                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Box mt={4} />

        </React.Fragment>
    )
}

