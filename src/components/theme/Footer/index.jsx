import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container } from 'components/common';
import { Wrapper, Flex, Links, Details, QuartCircle } from './styles';
import social from './social.json';

export const Footer = () => {
  const { theme } = useContext(ThemeContext);

    return (
  <Wrapper>
    <QuartCircle theme={theme} />
    <Flex as={Container}>

      <Details>
        <h2>Shine DAO</h2>
        <span>
          © All rights are reserved | {new Date().getFullYear()} | Made with&nbsp;
          <span aria-label="love" role="img">
            💖
          </span>
          &nbsp;across the World
        </span>
      </Details>
      <Links>
        {social.map(({ id, name, link, icon }) => (
          <a key={id} href={link} target="_blank" rel="noopener noreferrer" aria-label={`follow me on ${name}`}>
            <img width="24" src={icon} alt={name} />
          </a>
        ))}
      </Links>
    </Flex>
  </Wrapper>
);
};
