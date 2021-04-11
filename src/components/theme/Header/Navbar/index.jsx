import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container } from 'components/common';
import NavbarLinks from '../NavbarLinks';
import { Wrapper, Brand, LogoWrapper } from './styles';
import shineLogoV7 from 'assets/illustrations/shine-logo-v7.png';

const Navbar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper as={Container}>
      <Brand as={Link} to="/" theme={theme}>
      <LogoWrapper>

      <img height='40px' src={shineLogoV7} alt={theme} />
    </LogoWrapper>

      </Brand>
      <NavbarLinks desktop />
    </Wrapper>

  );
};

export default Navbar;
