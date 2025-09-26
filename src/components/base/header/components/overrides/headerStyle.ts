import { styled, AppBar } from "@mui/material";
const HeaderStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  boxShadow: "none",
  paddingTop: theme.spacing(1),
  paddingRight: "0 !important",
  paddingBottom: theme.spacing(1.75),
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create("all", {
    duration: theme.transitions.duration.complex,
  }),
  ".MuiToolbar-root": {
    justifyContent: "space-between",
    padding: 0,
    alignItems: "center",
    "@media (min-width: 600px)": {
      minHeight: 50,
    },
    ".menu": {
      display: "flex",
      flexDirection: "row",
      gap: theme.spacing(1),
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      li: {
        padding: 0,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        "&:not(:first-of-type)::before": {
          content: '"|"',
          display: "inline-block",
          position: "absolute",
          left: -5,
          marginTop: -8,
          color: theme.palette.text.disabled,
        },
        a: {
          minWidth: "fit-content",
          textWrap: "nowrap",
          color: theme.palette.text.primary,
          fontWeight: 500,
          "&::after": {
            content: '""',
            backgroundColor: theme.palette.primary.main,
            width: 0,
            height: 3,
            display: "block",
            transition: "0.5s",
            marginTop: 3,
            borderRadius: 2,
          },
          "&:hover::after": {
            width: "100%",
          },
        },
      },
    },
    "&.search-container": {
      minHeight: 0,
    },
  },
  ".logo_anchor": {
    lineHeight: "80%",
  },
}));
export default HeaderStyled;
