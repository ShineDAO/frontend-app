import React, { useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Button } from 'components/common';
import adAdastraV1 from 'assets/illustrations/adastra-v1.png';
import { HalfCircle  } from "./styles";

import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles';

export const WhatIsThisAbout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id="about">
      <HalfCircle />
      <SkillsWrapper as={Container}>
        <img width='400px' src={adAdastraV1} alt="Towards the stars! Are you ready?" />
        <Details theme={theme}>
          <h1>Participate Early</h1>
          <p>
            Access to invest in the future stars from their earliest stages all the way to blastoff from our launchpad.
          </p>
          <Button as={AnchorLink} href="#contact">
            Learn more
          </Button>
        </Details>

      </SkillsWrapper>
    </Wrapper>
  );
};
