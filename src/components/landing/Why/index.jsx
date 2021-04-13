import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import {Container, LearnButton} from 'components/common';
import rocketLaunchV1 from 'assets/illustrations/rocket-launch-v1.png';

import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles';

export const Why = () => {
  const { theme } = useContext(ThemeContext);

  const onScrollToContact = () => {
    document.querySelector('#contact').scrollIntoView({
      behavior: 'smooth'
    });
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
        <img width='400px' src={rocketLaunchV1} alt="Shine will get you to the moon and beyond!" />
      </SkillsWrapper>
    </Wrapper>
  );
};
