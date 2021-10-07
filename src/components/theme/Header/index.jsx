import React, { useContext, useState } from 'react';
import Navbar from './Navbar';
import Hamburger from './Hamburger';
import Sidebar from './Sidebar';
import { Wrapper, Overlay } from './styles';
import { ThemeContext } from '../../../providers/ThemeProvider';
import useIsMobile from '../../../hooks/useIsMobile';

export const Header = () => {
  const [sidebar, toggle] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isMobile = useIsMobile();

  return (
    <Wrapper  sidebar={sidebar} theme={theme} isMobile={isMobile}>
      <Overlay sidebar={sidebar} onClick={() => toggle(!sidebar)} />
      <Navbar />
      <Hamburger sidebar={sidebar} toggle={toggle} />
      <Sidebar sidebar={sidebar} toggle={toggle} />
    </Wrapper>
  );
};
