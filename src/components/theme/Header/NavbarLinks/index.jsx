import React, {useContext} from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import ToggleTheme from 'components/theme/Header/ToggleTheme';
import { Wrapper } from './styles';

import Wallet from 'components/theme/Header/Wallet';



const NavbarLinks = ({ desktop }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper desktop={desktop} theme={theme}>
      <a href="http://docs.shinedao.finance" target="_blank">Docs</a>
      <a href="https://shinedao.finance/Litepaper.pdf" target="_blank">Litepaper</a>
      <AnchorLink href="#contact">Launch App</AnchorLink>
      <ToggleTheme />
    </Wrapper>
  )

};

export default NavbarLinks;
