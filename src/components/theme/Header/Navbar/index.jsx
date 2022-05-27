import React, {useContext, useState} from 'react';
import {Link} from 'gatsby';
import {ThemeContext} from 'providers/ThemeProvider';
import {Container} from 'components/common';
import NavbarLinks from '../NavbarLinks';
import {Wrapper, Brand, LogoWrapper, HeadingText} from './styles';
import shineLogoV7 from 'assets/illustrations/shine-logo-v7.png';

import shineDaoLogoModern from 'assets/illustrations/shinedao-logo-modern.png';

import useIsMobile from '../../../../hooks/useIsMobile';

const Navbar = () => {

  const {theme} = useContext(ThemeContext);
  const isMobile = useIsMobile();

  return (
    <Wrapper as={Container} isMobile={isMobile}>
      <Brand as={Link} to="https://shinedao.finance" theme={theme}>
        <LogoWrapper>
          <img height={isMobile ? '40px': '53px'} src={shineDaoLogoModern} alt={theme}/><HeadingText theme={theme}></HeadingText>
        </LogoWrapper>
      </Brand>
      <NavbarLinks desktop />
    </Wrapper>
  );
};

export default Navbar;
