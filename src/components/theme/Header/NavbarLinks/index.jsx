import React, {useContext, useState} from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import ToggleTheme from 'components/theme/Header/ToggleTheme';
import { Wrapper } from './styles';
import {JoinButton} from "../../../common";

const NavbarLinks = ({ desktop }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper desktop={desktop} theme={theme}>
      <a href="http://docs.shinedao.finance" target="_blank">DOCS</a>
      <a href="http://forum.shinedao.finance" target="_blank">FORUM</a>
      {/*<a href="https://shinedao.finance/Litepaper.pdf" target="_blank">Litepaper</a>*/}
      <JoinButton
        onClick={() => window.location.href = '#about'}
        theme={theme}
      >
        SEE UPCOMING PROJECTS
      </JoinButton>
      <ToggleTheme />
    </Wrapper>
  )

};

export default NavbarLinks;
