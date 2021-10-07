import React, { useContext } from "react";
import { ThemeContext } from "providers/ThemeProvider";
import { Footer } from "components/theme";
import { Global } from "./styles";
import "./fonts.css";
import "./hide-overflow.css";

export const Layout = ({ children,position,bottom,width }) => {
  const { theme } = useContext(ThemeContext);
console.log("poss", position)
  return (
    <>
      <Global theme={theme} />
      {children}
      <Footer position={position} bottom={bottom} width={width} />
    </>
  );
};
