import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container } from 'components/common';
import NavbarLinks from '../NavbarLinks';
import { Wrapper, Brand, LogoWrapper } from './styles';
import shineLogoBlack from 'assets/illustrations/shine-logo-small-black.png';
import shineLogoBlackV1 from 'assets/illustrations/shine-logo-small-black-v1.png';

const Navbar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper as={Container}>
      <Brand as={Link} to="/" theme={theme}>
      <LogoWrapper>

      <img src={shineLogoBlackV1} alt={theme} />
    </LogoWrapper>

      </Brand>
      <NavbarLinks desktop />
    </Wrapper>

  );
};

export default Navbar;
