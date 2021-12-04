declare module "*.svg" {
  import React from "react";
  import Svg, { SvgProps } from 'react-native-svg';
  const Content: React.FC<SvgProps>;
  export default Content;
}
