import { Card, styled } from "@mui/material";
const CardStyled = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  transition: "all .3s",
  border: `1px solid transparent`,
  ".MuiCardContent-root": {
    backgroundColor: theme.palette.grey[500_8],
    transition: "all .3s",
    img: {
      transition: "all .3s",
    },
  },
  "&:hover": {
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.05)",
    border: `1px solid ${theme.palette.primary.main}`,
    ".MuiCardContent-root": {
      backgroundColor: theme.palette.background.default,
      img: {
        transform: "scale(1.1)",
      },
    },
  },
}));
export default CardStyled;
