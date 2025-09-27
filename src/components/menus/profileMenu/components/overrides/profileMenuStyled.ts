import { Fab, styled } from "@mui/material";
const ProfileMenuStyled = styled(Fab)(({ theme }) => ({
  backgroundColor: "transparent",
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
  height: 44,
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(0.525),
  "&:hover": {
    boxShadow: "0px 5px 10px -3px rgb(177, 176, 176)",
  },
}));
export default ProfileMenuStyled;
