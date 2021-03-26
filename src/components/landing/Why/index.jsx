import React, { useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Button } from 'components/common';
import rocketLaunch from 'assets/illustrations/rocket-launch.svg';
import rocketLaunchV1 from 'assets/illustrations/rocket-launch-v1.png';

import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles';

export const Why = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id="about">
      <SkillsWrapper as={Container}>

      <Thumbnail>
          <img src={rocketLaunchV1} alt="Shine will get you to the moon and beyond!" />
        </Thumbnail>
      
        <Details theme={theme}>
          <h1>Why are we setting this up?</h1>
          <p>
            To enable new possibilites for decentralized teams building next gen DeFi services. 
            Support, mentoring and common teams cohort are the means how we want to achieve this.
          </p>
          <Button as={AnchorLink} href="#contact">
            Learn more
          </Button>
        </Details>



      </SkillsWrapper>
    </Wrapper>
  );
};
        