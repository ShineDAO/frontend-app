import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Button } from 'components/common';
import starman_dark from 'assets/illustrations/starman_dark.png';
import useIsMobile from "../../../hooks/useIsMobile";

import {Wrapper, SkillsWrapper, Details, MobileHalfCircle} from './styles';
import {LearnButton} from "../../common/Button";

export const WhoAreWe = () => {
  const { theme } = useContext(ThemeContext);
  const isMobile = useIsMobile()

  const onScrollToContact = () => {
    window.open('https://docs.shinedao.finance/decentralising-startup-incubation/deal-flow', 'blank', 'noopener')
  }

  return (
    <Wrapper id="about">
      <MobileHalfCircle theme={theme} />
      <SkillsWrapper as={Container}>

        <img width={isMobile ? '174px' :'347px'} height={isMobile ? '156px' : '312px'} src={starman_dark} alt="We take you to the orbit and beyond!" />
        <Details theme={theme}>
          <h1>Are you building a project?</h1>
          <p>
            Get access to an active and incentivized community of contributors to polish your project.
          </p>
          <LearnButton onClick={onScrollToContact} theme={theme}>
            LEARN MORE
          </LearnButton>
        </Details>

      </SkillsWrapper>
    </Wrapper>
  );
};
