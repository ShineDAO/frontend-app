import React, { useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Button } from 'components/common';
import starman from 'assets/illustrations/starman.svg';
import starmanV1 from 'assets/illustrations/starman-v1.png';

import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles';

export const WhoAreWe = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id="about">
      <SkillsWrapper as={Container}>
      
        <Details theme={theme}>
          <h1>How are we going to do this?</h1>
          <p>
          We help new teams establish themselves in crypto community in legitimate and transparent way using IIOs.
          </p>
          <Button as={AnchorLink} href="#contact">
            Learn more
          </Button>
        </Details>


        <Thumbnail>
          <img src={starmanV1} alt="We take you to the orbit and beyond!" />
        </Thumbnail>
      </SkillsWrapper>
    </Wrapper>
  );
};
        