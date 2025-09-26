import { styled } from "@mui/material";
const FooterStyled = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  overflow: "hidden",
  paddingTop: theme.spacing(8),
  borderTop: `1px solid ${theme.palette.divider}`,
  ".footer-content-container": {
    position: "relative",
    display: "grid",
    gridTemplateColumns:
      "minmax(150px, 2fr) repeat(3, minmax(165px, 1fr)) minmax(150px, 2fr)",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr 1fr",
      gap: theme.spacing(4),
      gridTemplateRows: "auto",
      gridAutoFlow: "dense",
      paddingBottom: theme.spacing(12),
      "& > div:nth-child(1)": {
        gridColumn: "span 2",
      },
    },
    gap: theme.spacing(2),
    ".social-list": {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 8,
      ".MuiListItem-root": {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: 20,
        width: "auto",
        padding: theme.spacing(0.5),
        transition: "all .3s",
        a: {
          display: "flex",
          svg: {
            width: 20,
            height: 20,
            path: {
              fill: theme.palette.primary.main,
            },
          },
        },
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          svg: {
            path: {
              fill: theme.palette.background.paper,
            },
          },
        },
      },
    },
    ".title": {
      width: "fit-content",
      position: "relative",
      "&::after": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: 2,
        bottom: -4,
        left: 0,
        backgroundColor: theme.palette.primary.main,
      },
    },
    ".link": {
      fontSize: theme.typography.body1.fontSize,
      fontWeight: 500,
      color: theme.palette.text.primary,
      transition: "all .3s",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    ".news-letter-wrap": {
      border: `1px solid ${theme.palette.divider}`,
      display: "flex",
      alignItems: "center",
      borderRadius: 30,
      padding: 5,
      paddingLeft: theme.spacing(2),
      gap: theme.spacing(2),
      input: {
        flex: 1,
      },
      button: {
        minWidth: 40,
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      },
      [theme.breakpoints.down("md")]: {
        position: "absolute",
        bottom: 22,
        left: 0,
        width: "100%",
        zIndex: 0,
      },
    },
  },
  // ".footer-animation": {
  //   overflow: "hidden",
  //   position: "relative",
  //   backgroundColor: theme.palette.grey[200],
  //   paddingBottom: theme.spacing(4),
  //   ".footer_bg_one": {
  //     background:
  //       "url(/static/images/delivery_van.gif) no-repeat center center",
  //     width: 330,
  //     height: 105,
  //     backgroundSize: "100%",
  //     position: "absolute",
  //     bottom: 0,
  //     [theme.breakpoints.down("md")]: {
  //       display: "none",
  //     },
  //     "@keyframes move": {
  //       "0%": {
  //         left: "-20%",
  //       },
  //       "100%": {
  //         left: "100%",
  //       },
  //     },
  //     animation: "move 20s infinite linear",
  //   },
  //   ".footer_bg_two": {
  //     background:
  //       "url(/static/images/delivery_bike.gif) no-repeat center center",
  //     width: 88,
  //     height: 100,
  //     backgroundSize: "100%",
  //     position: "absolute",
  //     bottom: 0,
  //     [theme.breakpoints.down("md")]: {
  //       display: "none",
  //     },
  //     "@keyframes moveBike": {
  //       "0%": {
  //         left: "-10%",
  //       },
  //       "100%": {
  //         left: "100%",
  //       },
  //     },
  //     animation: "moveBike 25s infinite linear",
  //   },
  // },
  ".footer-bottom": {
    padding: theme.spacing(1, 0),
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.grey[200],
    img: {
      width: "100%",
      objectFit: "contain",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
export default FooterStyled;
