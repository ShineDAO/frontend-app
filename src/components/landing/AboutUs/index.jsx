import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';

import man from 'assets/illustrations/man.png';
import planet from 'assets/illustrations/planet.png';
import shineNetwork from 'assets/illustrations/shine-network-without-dude.png';

import { LearnButton }from '../../common/Button/index';
import useIsMobile from '../../../hooks/useIsMobile';
import {
  Wrapper,
  AboutUsWrapper,
  Details,
  WrapperButton,
  IllustrationMan,
  IllustrationShineNetwork3,
  IllustrationPlanet
} from './styles';


export const WhatIsThisAbout = () => {
  const { theme } = useContext(ThemeContext);
  const isMobile = useIsMobile();
  const onScrollToContact = (link) => {
    window.open(link, '_blank', 'noopener');
  };

  return (
    <Wrapper id="about">
      <AboutUsWrapper>
        <h2>About Us</h2>
        <Details theme={theme}>
          <div className="what">
            <IllustrationMan
              src={man}
              alt="Towards the stars! Are you ready?"
            />
            <h2>Early deal access</h2>
            <p>
              Exclusive access to early-stage and thrust-worthy gems.
          </p>
          </div>
          <div className="why">
            <IllustrationShineNetwork3 src={theme === 'light' ? shineNetwork : shineNetwork} alt="Shine will get you to the moon and beyond!" />
            <h2>Contribute</h2>
            <p>
              Get involved with new projects by completing technical and engagement missions.

          </p>
          </div>
          <div className="who">
            <IllustrationPlanet src={planet} alt="We take you to the orbit and beyond!" />
            <h2>Get Rewarded</h2>
            <p>
              5 - 20 % of projects tokens will be distributed to early contributors.
          </p>
          </div>
        </Details>
        <WrapperButton>
          <LearnButton onClick={() => onScrollToContact("https://docs.shinedao.finance/decentralising-startup-incubation/community-incentives")} theme={theme}>
            LEARN MORE
          </LearnButton>
        </WrapperButton>
      </AboutUsWrapper>
    </Wrapper>
  );
};

