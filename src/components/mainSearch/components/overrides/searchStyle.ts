import { Paper, PaperProps, styled } from "@mui/material";
interface StyledProps extends PaperProps {
  component?: React.ElementType;
}
const SearchStyled = styled(Paper)<StyledProps>(({ theme }) => ({
  borderRadius: theme.spacing(4),
  padding: theme.spacing(1.5, 3),
  paddingTop: theme.spacing(2.4),
  paddingRight: 60,
  position: "relative",
  display: "flex",
  alignItems: "center",
  maxWidth: 660,
  width: "100%",
  margin: "auto",
  border: `1px solid ${theme.palette.divider}`,
  gap: theme.spacing(1),
  transition: theme.transitions.create(["max-width", "top"], {
    duration: theme.transitions.duration.complex,
  }),
  ".MuiFormLabel-root": {
    left: -14,
    top: -3,
  },
  ".MuiDivider-root": {
    minHeight: 28,
    position: "relative",
    top: -3,
    margin: theme.spacing(0, 1),
  },
  ".MuiInputBase-input": {
    "&::placeholder": {
      color: theme.palette.text.primary,
    },
  },
  button: {
    position: "absolute",
    right: 0,
    "&.MuiFab-root": {
      height: 48,
      width: 48,
      right: 6,
      top: 6,
    },
  },
  "&.collapsed": {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: -46,
    padding: theme.spacing(1, 3),
    paddingRight: 48,
    maxWidth: 412,
    ".MuiFormLabel-root": {
      opacity: 0,
      visibility: "hidden",
    },
    ".MuiDivider-root": {
      minHeight: 20,
      top: 0,
    },
    button: {
      "&.MuiFab-root": {
        height: 36,
        width: 36,
        top: 4.5,
      },
    },
  },
})) as React.FC<StyledProps>;
export default SearchStyled;
