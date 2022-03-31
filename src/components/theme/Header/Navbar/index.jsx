import React, {useContext, useState} from 'react';
import {Link} from 'gatsby';
import {ThemeContext} from 'providers/ThemeProvider';
import {Container} from 'components/common';
import NavbarLinks from '../NavbarLinks';
import {Wrapper, Brand, LogoWrapper, HeadingText} from './styles';
import shineLogoV7 from 'assets/illustrations/shine-logo-v7.png';
import useIsMobile from '../../../../hooks/useIsMobile';
import { useLocation } from '@reach/router';

const Navbar = () => {
  const pathname = useLocation().pathname.replace(/\//g, '');
  console.log("location pathname ", pathname)
  const {theme} = useContext(ThemeContext);
  const isMobile = useIsMobile();

  return (
    <Wrapper as={Container} isMobile={isMobile}>
      <Brand as={Link} to="/" theme={theme}>
        <LogoWrapper>
          <img width={isMobile ? '45px' : '60px'} height={isMobile ? '40px': '53px'} src={shineLogoV7} alt={theme}/><HeadingText theme={theme}>ShineDAO</HeadingText>
        </LogoWrapper>
      </Brand>
      <NavbarLinks desktop pathname={pathname}/>
    </Wrapper>
  );
};

export default Navbar;
