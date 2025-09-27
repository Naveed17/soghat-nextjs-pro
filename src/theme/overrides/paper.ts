export default function Paper(theme: any) {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: "all ease-in-out 0.3s",
          boxShadow: theme.customShadows.primary,
        },
      },
    },
  };
}
