import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import {Container, Button, LearnButton} from 'components/common';
import adAdastraV1 from 'assets/illustrations/adastra-v1.png';
import { HalfCircle  } from "./styles";
import useIsMobile from '../../../hooks/useIsMobile';
import { Wrapper, SkillsWrapper, Details } from './styles';

export const WhatIsThisAbout = () => {
  const { theme } = useContext(ThemeContext);
  const isMobile = useIsMobile();
  const onScrollToContact = () => {
    window.open('https://docs.shinedao.finance/positioning', 'blank', 'noopener')
  }

  return (
    <Wrapper id="about">
      <HalfCircle theme={theme} />
      <SkillsWrapper as={Container}>
        <img width={isMobile ? '192px' : '385px'} height={isMobile ? '156px' : '312px' } src={adAdastraV1} alt="Towards the stars! Are you ready?" />
        <Details theme={theme}>
          <h1>Participate Early</h1>
          <p>
            Access to invest in the future stars from their earliest stages all the way to blast off from our launchpad.
          </p>
          <LearnButton onClick={onScrollToContact} theme={theme}>
            LEARN MORE
          </LearnButton>
        </Details>

      </SkillsWrapper>
    </Wrapper>
  );
};
