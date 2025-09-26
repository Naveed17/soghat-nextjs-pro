import { styled, Card } from "@mui/material";
const ProductCardStyled = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
  ".MuiCardMedia-root": {
    height: 240,
    position: "relative",
    overflow: "hidden",
    img: {
      transition: "all 0.3s ease-in-out",
    },
    ".btn-wishlist": {
      position: "absolute",
      minWidth: 0,
      padding: 4,
      height: 36,
      width: 36,
      right: 20,
      top: 20,
      zIndex: 1,
      opacity: 0,
      visibility: "hidden",
      transition: "all 0.3s ease-in-out",
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 7,
      backgroundColor: theme.palette.common.white,
      color: theme.palette.text.primary,
      svg: {
        transform: "scale(.9)",
        "&.fav_icon": {
          width: 26,
          height: 26,
          "&.filled": {
            width: 24,
            height: 24,
            path: {
              stroke: "unset",
            },
          },
        },
      },
    },
  },
  ".MuiCardContent-root": {
    padding: theme.spacing(2),
  },
  ".MuiCardActions-root": {
    padding: theme.spacing(2),
    paddingTop: 0,
    justifyContent: "space-between",
    alignItems: "center",
    button: {
      minWidth: 50,
    },
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.customShadows.primary,
    ".btn-wishlist": {
      visibility: "visible",
      opacity: 1,
      transition: "all 0.3s ease-in-out",
    },
    img: {
      transform: "scale(1.1)",
    },
  },
}));
export default ProductCardStyled;
