import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import {Container, LearnButton} from 'components/common';
import rocketLaunchV1 from 'assets/illustrations/rocket-launch-v1.png';
import useIsMobile from "../../../hooks/useIsMobile";

import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles';

export const Why = () => {
  const {theme} = useContext(ThemeContext);
  const isMobile = useIsMobile()

  const onScrollToContact = () => {
    window.open('https://docs.shinedao.finance/decentralising-startup-incubation/community-incentives', 'blank', 'noopener')
  }


  return (
    <Wrapper id="about">
      <SkillsWrapper as={Container}>
        <Details theme={theme}>
          <h1>Contribute and get rewarded</h1>
          <p>
          Join one of the operating squads, complete a task or suggest your own initiative. 5-20% of projects tokens will be distributed to early contributors.
          </p>
          <LearnButton onClick={onScrollToContact} theme={theme}>
            LEARN MORE
          </LearnButton>
        </Details>
        <img width={isMobile ? '200px' : '401px'} height={isMobile ? '142px' : '257px'} src={rocketLaunchV1} alt="Shine will get you to the moon and beyond!" />
      </SkillsWrapper>
    </Wrapper>
  );
};
