export default function Card(theme: any) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          position: "relative",
          zIndex: 0, // Fix Safari overflow: hidden with border radius
          border: `none`,
          transition: "all ease-in-out 0.3s",
          background: theme.palette.background.paper,
          borderRadius: theme.spacing(1.5),
          boxShadow: theme.customShadows.primary,
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: "h6" },
        subheaderTypographyProps: {
          variant: "body2",
          marginTop: theme.spacing(0.5),
        },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
          [theme.breakpoints.down("md")]: {
            padding: theme.spacing(2), // Reduced padding for medium screens
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
          [theme.breakpoints.down("md")]: {
            padding: theme.spacing(2), // Reduced padding for medium screens
          },
        },
      },
    },
  };
}
