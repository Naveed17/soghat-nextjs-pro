import React from "react";
import { PaletteColor } from "@mui/material";

declare module "@mui/material/Fab" {
  interface FabPropsColorOverrides {
    text: true;
    white: true;
    black: true;
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    google: true;
    white: true;
    "text-transparent": true;
    "text-black": true;
    "contained-white": true;
    filter: true;
    "text-primary": true;
    consultationIP: true;
    "primary-light": true;
    grey: true;
  }

  interface ButtonPropsColorOverrides {
    text: true;
    white: true;
    black: true;
    expire: true;
  }
}
declare module "@mui/material/Alert" {
  interface AlertPropsColorOverrides {
    primary: true;
    expire: true;
    white: true;
  }
}
declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    white: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    contained: true;
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    text: true;
    white: true;
    black: true;
  }
}

declare module "@mui/material" {
  interface Color {
    0: number | string;
    500_8: number | string;
  }

  interface PaletteColor {
    lighter: string;
    light: string;
    main: string;
    darker?: string;
  }

  interface Palette {
    back: PaletteColor;
    white: PaletteColor;
    expire: PaletteColor;
  }

  interface ThemeOptions {
    customShadows?: CustomShadowType;
  }

  interface IconButtonPropsColorOverrides {
    white: true;
  }
}

declare module "@mui/material/styles" {
  interface Theme {
    customShadows: CustomShadowType;
  }
}

declare module "@emotion/styled/types" {
  interface CreateStyled<T> {
    isDragging?: Boolean;
  }
}
