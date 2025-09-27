import { Stack, styled } from "@mui/material";
export const AsideStyled = styled(Stack)(({ theme }) => ({
  ".underline": {
    maxWidth: 120,
    marginTop: 10,
    borderWidth: 1.35,
    borderColor: theme.palette.primary.main,
    borderRadius: 10,
  },
  ".MuiListItem-root": {
    cursor: "pointer",
    ".MuiListItemIcon-root": {
      minWidth: 24,
    },
    ".MuiTypography-root": { fontSize: 12 },
  },
  ".sub-cat": {
    marginLeft: theme.spacing(3.5),
    borderLeft: `1px solid ${theme.palette.divider}`,
    maxHeight: 200,
    overflow: "auto",
    "& > li": {
      "&:first-of-type::before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: 14,

        width: 8,
        height: 1,
        backgroundColor: theme.palette.divider,
      },
    },
    ".sub-sub-cat": {
      paddingLeft: theme.spacing(2),
      marginLeft: theme.spacing(2),
      borderLeft: `1px solid ${theme.palette.divider}`,
      li: {
        paddingLeft: theme.spacing(2),
        borderLeft: `1px solid ${theme.palette.divider}`,
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 14,
          width: 8,
          height: 1,
          backgroundColor: theme.palette.divider,
        },
      },
      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: 14,
        width: 8,
        height: 1,
        backgroundColor: theme.palette.divider,
      },
    },
  },
}));
