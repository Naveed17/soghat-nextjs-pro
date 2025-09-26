'use client'
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { useRouter } from 'next/navigation';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

export default function CustomBreadcrumbs({ ...props }) {
    const { data } = props;
    const router = useRouter()

    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, route: string | null) {
        event.preventDefault();
        router.push(route as string)

    }

    const breadcrumbs = data.map((item: { title: string, href: string | null }, idx: number) => (
        item.href ?
            <MuiLink key={idx} underline="none"
                sx={{ color: theme => theme.palette.grey[700], fontSize: 12, fontWeight: 500, cursor: 'pointer' }}
                onClick={(e) => handleClick(e, item.href)}>
                {item.title}
            </MuiLink>
            :
            <Typography key={idx} variant='body2' fontWeight={500} color='primary'>
                {item.title}
            </Typography>

    ))


    return (
        <Breadcrumbs
            separator={<NavigateNextIcon />}
            aria-label="breadcrumb"
            sx={{
                '.MuiBreadcrumbs-li': {
                    a: {
                        fontSize: 12,
                        display: 'flex', alignItems: 'center', gap: 0.5,
                        svg: { fontSize: 18 }
                    }
                },
                '.MuiBreadcrumbs-separator': {
                    svg: {
                        fontSize: 14,
                    }
                }
            }}
        >
            <Link href='/'>
                <HomeIcon /> Home
            </Link>
            {breadcrumbs}
        </Breadcrumbs>

    );
}
