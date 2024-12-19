import tinyColor from "tinycolor2";
import { purple, blue, green, orange, red, shades } from "./colors";

const gradients = {
  1: `linear-gradient(90deg, ${purple[1000]} -23.99%, ${purple[700]} 51.36%, ${purple[1000]} 120.51%)`,
  2: `linear-gradient(144.8deg, ${purple[600]} -20.58%, ${purple[800]} 95.11%)`,
  3: `linear-gradient(144.8deg, ${blue[500]} -20.58%, ${blue[700]} 95.11%)`,
  4: `linear-gradient(180deg, ${purple[400]} 0%, ${purple[600]} 100%);`,
  5: `linear-gradient(94.32deg, ${tinyColor(shades[100])
    .setAlpha(0.5)
    .toString()} -25.26%, ${tinyColor(shades[100])
    .setAlpha(0)
    .toString()} 113.09%);`,
  6: `linear-gradient(62.11deg, ${tinyColor(shades[100])
    .setAlpha(0.9)
    .toString()} 37.51%, ${tinyColor(shades[100])
    .setAlpha(0.45)
    .toString()}  123.7%);`,
  success: `linear-gradient(180deg, ${green[300]} 0%, ${green[400]} 100%)`,
  info: `linear-gradient(180deg, ${purple[500]} 0%, ${purple[600]} 100%)`,
  warning: `linear-gradient(144.8deg, ${orange[400]} -20.58%, ${orange[500]} 95.11%)`,
  failure: `linear-gradient(144.8deg, ${red[600]} -20.58%, ${red[600]} 95.11%)`,
};

export default gradients;
