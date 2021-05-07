import React, {useContext, useState} from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import ToggleTheme from 'components/theme/Header/ToggleTheme';
import { Wrapper } from './styles';
import {JoinButton} from "../../../common";

const NavbarLinks = ({ desktop }) => {
  const { theme } = useContext(ThemeContext);
  const [buttonText, setButtonText] = useState('Go to App')

  return (
    <Wrapper desktop={desktop} theme={theme}>
      <a href="http://docs.shinedao.finance" target="_blank">Docs</a>
      <a href="https://shinedao.finance/Litepaper.pdf" target="_blank">Litepaper</a>
      <JoinButton
        narrow
        onMouseEnter={() => setButtonText('Coming soon')}
        onMouseLeave={() => setButtonText('Go to App')}
        onClick={() => setButtonText('Coming soon')}
        theme={theme}
      >
        {buttonText}
      </JoinButton>
      <ToggleTheme />
    </Wrapper>
  )

};

export default NavbarLinks;
