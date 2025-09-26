'use client';
import * as React from 'react';
import { cloneDeep } from 'lodash'
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import * as locales from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';
import palette from './palette';
import rtlPlugin from 'stylis-plugin-rtl';
import typography from './typography';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import GlobalStyles from './globalStyles';
import { useAppDispatch, useAppSelector } from '@lib/redux/store'
import { customShadows } from './shadows';
import { fetchWebContent } from '@lib/redux/websiteContent';
import { fetchWishlist } from '@lib/redux/wishlist';
const Localization = (lang: string) => {
  switch (lang) {
    case 'ar':
      return 'arEG';
    case 'en':
      return 'enUS';
    default:
      return 'enUS';
  }
};
type SupportedLocales = keyof typeof locales;
export default function ThemeRegistry({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang?: string | undefined;
}) {

  const locale: SupportedLocales = Localization(lang!);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const { primary, textColor } = useAppSelector((state) => state.websiteContent);
  const deepCopy = cloneDeep(palette);
  const themeMui = useTheme();
  const themeWithLocale = React.useMemo(
    () =>
      createTheme(
        {
          palette: {
            ...deepCopy,
            primary: {
              ...deepCopy.primary,
              main: !!primary && primary || themeMui.palette.primary.main,
              dark: !!primary && primary || themeMui.palette.primary.main,
            },
            text: {
              ...deepCopy.text,
              primary: textColor || '#000',
            }

          },

          direction: dir,
          typography,
          breakpoints,
          customShadows: customShadows
        },
        locales[locale]
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dir, primary, textColor]
  );
  const theme = {
    ...themeWithLocale, components: {
      ...componentsOverride(themeWithLocale),
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'all 0.3s ease-in-out',  // Add your desired transition properties
          },
        },
      },

    },

  }
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchWebContent());
    dispatch(fetchWishlist());
  }, [dispatch]);
  return (
    <AppRouterCacheProvider
      options={{
        key: dir === 'rtl' ? 'muirtl' : 'css',
        stylisPlugins: dir === 'rtl' ? [rtlPlugin] : [],
      }}>
      <GlobalStyles {...{ theme }} />
      <ThemeProvider
        theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <main dir={dir}>{children}</main>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
