import SimpleBarReact from "simplebar-react";
// material
interface Props {
  timeout: number;
}
import { alpha, styled } from "@mui/material/styles";
const SimpleBarStyle = styled(SimpleBarReact)<Props>(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
}));
export default SimpleBarStyle;
// ----------------------------------------------------------------------
