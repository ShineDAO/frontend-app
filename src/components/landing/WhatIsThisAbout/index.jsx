import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, LearnButton } from 'components/common';

import man from 'assets/illustrations/man.png';
import rocket from 'assets/illustrations/rocket.png';
import planet from 'assets/illustrations/planet.png';

import useIsMobile from '../../../hooks/useIsMobile';
import { Wrapper, SkillsWrapper, Details } from './styles';

export const WhatIsThisAbout = () => {
  const { theme } = useContext(ThemeContext);
  const isMobile = useIsMobile();
  const onScrollToContact = () => {
    window.open('https://docs.shinedao.finance/positioning', 'blank', 'noopener');
  };

  return (
    <Wrapper id="about">
      <SkillsWrapper as={Container}>
      <h2>ABOUT US</h2>
        <Details theme={theme}>
         <div className= "what">
        <img
          width={isMobile ? '192px' : '220px'}
          height={isMobile ? '156px' : '180px'}
          src={man}
          alt="Towards the stars! Are you ready?"
        />
          <h2>Participate Early</h2>
          <p>
            Access to invest in the future stars from their earliest stages all the way to blast off from our launchpad.
          </p>
         </div>
         <div className="why">
          <img width={isMobile ? '200px' : '225px'} height={isMobile ? '142px' : '180px'} src={rocket} alt="Shine will get you to the moon and beyond!" />
          <h2>Contribute and get rewarded</h2>
          <p>
          Participate in a secure and compliant environment to get assets beyond ERC20 standard.
          </p>
        </div>
        <div className="who">
          <img width={isMobile ? '174px' :'230px'} height={isMobile ? '156px' : '180px'} src={planet} alt="We take you to the orbit and beyond!" />
          <h2>Are you building a project?</h2>
          <p>
          Access to an active and incentivized community of contributors from day 1 to polish your project.
          </p>
        </div>
        </Details>
        <LearnButton onClick={onScrollToContact} theme={theme}>
            LEARN MORE
          </LearnButton>
      </SkillsWrapper>
    </Wrapper>
  );
};
