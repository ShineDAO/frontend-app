import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';

import man from 'assets/illustrations/man.png';
import planet from 'assets/illustrations/planet.png';

import shineNetworkV3 from 'assets/illustrations/shine-network-v3.png';
import useIsMobile from '../../../hooks/useIsMobile';
import {
  Wrapper,
  AboutUsWrapper,
  Details,
  Button,
  WrapperButton,
  IllustrationMan,
  IllustrationShineNetwork3,
  IllustrationPlanet
} from './styles';

import ShineNetworkWhite from 'assets/illustrations/Shine-Network-White.svg';


export const WhatIsThisAbout = () => {
  const { theme } = useContext(ThemeContext);
  const isMobile = useIsMobile();
  const onScrollToContact = (link) => {
    window.open(link, '_blank', 'noopener');
  };

  return (
    <Wrapper id="about">
      <AboutUsWrapper>
        <h2>About us</h2>
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
            <IllustrationShineNetwork3 src={theme === 'light' ? shineNetworkV3 : ShineNetworkWhite} alt="Shine will get you to the moon and beyond!" />
            <h2>Contribute and get rewarded</h2>
            <p>
              5 - 20 % of projects tokens will be distributed to early contributors.

          </p>
          </div>
          <div className="who">
            <IllustrationPlanet src={planet} alt="We take you to the orbit and beyond!" />
            <h2>Are you building a project?</h2>
            <p>
              Get access to community of contributors to polish your project.
          </p>
          </div>
        </Details>
        <WrapperButton>
          <Button onClick={() => onScrollToContact("https://docs.shinedao.finance/decentralising-startup-incubation/community-incentives")} theme={theme}>
            LEARN MORE
          </Button>
        </WrapperButton>
      </AboutUsWrapper>
    </Wrapper>
  );
};

