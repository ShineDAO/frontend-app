import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container } from 'components/common';
import { Wrapper, FooterWrapper, Links, Details, QuartCircle } from './styles';
import { social } from './social.js';

export const Footer = () => {
  const { theme } = useContext(ThemeContext);

    return (
  <Wrapper>
    {/* <QuartCircle theme={theme} /> */}
    <FooterWrapper>
      <Details>
        <h3>ShineDAO</h3>
        <span>
          © All rights are reserved | {new Date().getFullYear()} | Made with&nbsp;
          <span aria-label="love" role="img">
            💖
          </span>
          &nbsp;across the World
        </span>
      </Details>
      <Links>
        {social.map(({ id, name, link, icon, iconLightTheme }) => (
          <a key={id} href={link} target="_blank" rel="noopener noreferrer" aria-label={`follow me on ${name}`}>
            <img width="24" src={theme === 'light' ? iconLightTheme : icon} alt={name} />
          </a>
        ))}
      </Links>
    </FooterWrapper>
  </Wrapper>
);
};
