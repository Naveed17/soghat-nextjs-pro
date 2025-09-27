import { merge } from "lodash";
import Card from "./card";
import Button from "./button";
import Input from "./input";
import Tooltip from "./Tooltip";
import Paper from "./paper";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: any) {
  return merge(
    Card(theme),
    Button(theme),
    Input(theme),
    Tooltip(theme),
    Paper(theme)
  );
}
