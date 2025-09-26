'use client'
import * as React from "react";
import { Pagination as BasicPagination } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ ...props }) {
    const { total, current_page, last_page = 1, ...rest } = props;
    const router = useRouter();
    const searchParams = useSearchParams();
    if (total === 0) return null;
    return (
        <Box
            display="flex"
            my={1}
            justifyContent="space-between"
            alignItems="center"
            {...rest}>
            <BasicPagination
                variant="outlined" shape="rounded"
                onChange={(e, v: any) => {
                    const params = new URLSearchParams(searchParams);
                    params.set('page', v);
                    router.push(`?${params.toString()}`);


                }}
                count={last_page}
                page={current_page}
                color="primary"
            />
        </Box>
    );
}
