// ----------------------------------------------------------------------

export default function Tooltip(theme: any) {
  const isLight = theme.palette.mode === "light";

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.primary.main,
        },
        arrow: {
          color: theme.palette.primary.main,
        },
      },
    },
  };
}
