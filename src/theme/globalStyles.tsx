'use client';
// mui
import { GlobalStyles as GlobalThemeStyles, Theme } from '@mui/material';
// ----------------------------------------------------------------------

export default function GlobalStyles({ ...props }) {
  const { theme } = props
  return (
    <GlobalThemeStyles
      styles={{
        '*': {
          textDecoration: 'none',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },

        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          width: '100%',
          height: '100%',
        },

        '#__next': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
          '&[type=date]': {
            '&::-webkit-calendar-picker-indicator': {
              color: 'red!important',
            },
          },
        },
        '.home-banner': {
          boxShadow: theme.customShadows.z1,
          height: 368,
          borderRadius: 10,
          img: {
            borderRadius: 10,
          }
        },
        a: {
          color: 'inherit'
        }
      }}
    />
  );
}
