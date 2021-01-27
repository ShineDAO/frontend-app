import React, { useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Button } from 'components/common';
import adAdastra from 'assets/illustrations/ad-adastra.svg';
import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles';

export const WhatIsThisAbout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id="about">
      <SkillsWrapper as={Container}>
      
        <Details theme={theme}>
          <h1>What is this about?</h1>
          <p>
            You can think of it as a Y Combinator for teams developing the new DeFi projects.
          </p>
          <Button as={AnchorLink} href="#contact">
            Learn more
          </Button>
        </Details>


        <Thumbnail>
          <img src={adAdastra} alt="Towards the stars! Are you ready?" />
        </Thumbnail>
      </SkillsWrapper>
    </Wrapper>
  );
};
        