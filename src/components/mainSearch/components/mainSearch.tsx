'use client'
import React, { useEffect, useRef, useState } from 'react'
import SearchStyled from './overrides/searchStyle'
import { FormControl, InputBase, InputLabel, Divider, Fab, alpha, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
function MainSearch({ ...props }) {
    const { isScrolled } = props;
    const router = useRouter()
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<any>({
        brand: '',
        category: '',
        product: ''
    });
    const btnRef = React.useRef<any>(false);
    const isClickedRef = useRef<boolean>(false); // Tracks the "clicked" state
    const handleFocus = (inputName: string) => setFocusedInput(inputName);
    const handleSearch = () => {
        isClickedRef.current = true;
        if (searchValue.brand || searchValue.category || searchValue.product) {
            router.push(`/listing/search?brand=${searchValue.brand.replace(/ /g, "-")}&category=${searchValue.category.replace(/ /g, "-")}&product=${searchValue.product.replace(/ /g, "-")}`)
        }
    };

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }
    const handleDocumentClick = (event: MouseEvent) => {
        // Check if the click is outside the button
        if (btnRef.current && !btnRef.current.contains(event.target as Node)) {
            isClickedRef.current = false;
            setFocusedInput(null);


        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleDocumentClick);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, []);

    return (
        <SearchStyled
            {...(focusedInput && {
                sx: {
                    gap: 0,
                    backgroundColor: 'transparent',

                }
            })}
            className={isScrolled ? 'collapsed' : ''}>
            <FormControl
                {...(focusedInput === 'brand-input' && {
                    fullWidth: true
                })}
            >
                <InputLabel shrink htmlFor="brand-input">
                    Search By
                </InputLabel>
                <InputBase
                    value={searchValue.brand}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setSearchValue({
                        category: '',
                        product: '',
                        brand: e.target.value
                    })}
                    sx={{
                        width: focusedInput === 'brand-input' ? '100%' : focusedInput === null ? 'auto' : '0',
                        display: focusedInput === 'brand-input' || focusedInput === null ? 'block' : 'none',
                    }}
                    onFocus={(e) => handleFocus(e.target.id)} id='brand-input' placeholder='Brands' />
            </FormControl>
            {focusedInput === null && <Divider orientation='vertical' />}
            <FormControl

                {...(focusedInput === 'categories-input' && {
                    fullWidth: true
                })}
            >
                <InputLabel shrink htmlFor="categories-input">
                    Search By
                </InputLabel>
                <InputBase
                    value={searchValue.category}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setSearchValue({
                        brand: '',
                        product: '',
                        category: e.target.value
                    })}
                    sx={{
                        width: focusedInput === 'categories-input' ? '100%' : focusedInput === null ? 'auto' : '0',
                        display: focusedInput === 'categories-input' || focusedInput === null ? 'block' : 'none',
                    }}
                    onFocus={(e) => handleFocus(e.target.id)} id="categories-input" placeholder='Categories' />
            </FormControl>
            {focusedInput === null && <Divider orientation='vertical' />}

            <FormControl
                {...(focusedInput === 'product-input' && {
                    fullWidth: true
                })}
            >
                <InputLabel shrink htmlFor="product-input">
                    Search By
                </InputLabel>
                <InputBase
                    value={searchValue.product}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setSearchValue({
                        brand: '',
                        category: '',
                        product: e.target.value
                    })}
                    fullWidth
                    sx={{
                        width: focusedInput === 'product-input' ? '100%' : focusedInput === null ? 'auto' : '0',
                        display: focusedInput === 'product-input' || focusedInput === null ? 'block' : 'none',
                    }}

                    onFocus={(e) => handleFocus(e.target.id)} id="product-input" placeholder='Product' />
            </FormControl>

            <Fab


                ref={btnRef} onClick={handleSearch} color='primary' {...(focusedInput !== null && {
                    variant: "extended",
                    sx: {
                        '&.MuiFab-root': { width: 'auto !important' },
                    }

                })}>
                <SearchIcon />
                {focusedInput !== null && 'Search'}
            </Fab>
            {
                <Box
                    component={motion.div}
                    variants={{
                        hidden: {
                            opacity: 0,
                            width: 0,
                        },
                        visible: {
                            opacity: 1,
                            width: "100%",
                        },
                    }}
                    animate={focusedInput ? "visible" : "hidden"}
                    transition={{ duration: .7 }}
                    sx={{
                        height: '100%',
                        maxWidth: "100%",
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        background: (theme) => alpha(theme.palette.background.paper, 0.3),
                        boxShadow: (theme) => theme.shadows[2],
                        zIndex: -1,
                        borderRadius: 32,
                    }}
                />
            }
        </SearchStyled >
    )
}

export default MainSearch