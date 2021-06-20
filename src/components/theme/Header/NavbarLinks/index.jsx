import React, {useContext, useState} from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import ToggleTheme from 'components/theme/Header/ToggleTheme';
import { Wrapper } from './styles';
import {JoinButton} from "../../../common";

const NavbarLinks = ({ desktop }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper desktop={desktop} theme={theme}>
      <a href="http://docs.shinedao.finance" target="_blank">Docs</a>
      <a href="https://shinedao.finance/Litepaper.pdf" target="_blank">Litepaper</a>
      <JoinButton
        onClick={() => window.open(link, '_blank', 'noopener')}
        theme={theme}
      >
        See upcoming projects
      </JoinButton>
      <ToggleTheme />
    </Wrapper>
  )

};

export default NavbarLinks;
