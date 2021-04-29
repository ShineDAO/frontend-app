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
    window.open('https://docs.shinedao.finance/shinedao/pr-and-community-building/raising-iio-with-shine', 'blank', 'noopener')
  }


  return (
    <Wrapper id="about">
      <SkillsWrapper as={Container}>
        <Details theme={theme}>
          <h1>The Future is Multichain</h1>
          <p>
            Participate in a secure and compliant environment to get assets beyond ERC20 standard.
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
