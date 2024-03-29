import React, { useContext } from "react";
import { ThemeContext } from "providers/ThemeProvider";
import sunIcon from "assets/icons/sunIcon.svg";
import moonIcon from "assets/icons/moonIcon.svg";
import { Wrapper } from "./styles";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Wrapper type="button" onClick={toggleTheme}>
      {false && <img src={theme === "light" ? moonIcon : sunIcon} alt={theme} />}
    </Wrapper>
  );
};

export default ToggleTheme;
