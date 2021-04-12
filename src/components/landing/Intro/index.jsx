import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Header } from 'components/theme';
import { Container, JoinButton, LearnButton } from 'components/common';
import shineNetworkV3 from 'assets/illustrations/shine-network-v3.png';

import { Wrapper, IntroWrapper, Details, ButtonWrapper, QuartCircleIntro } from './styles';

export const Intro = () => {
  const { theme } = useContext(ThemeContext);
  const onJoinButtonClick = () => {
    window.open("https://discord.gg/QkhbP7bZrj", "_blank", "noopener")
  }

  const onLearnButtonClick = () => {
    window.open("https://v2s0c9giox5.typeform.com/to/OElYo1Fe", "_blank", "noopener")
  }

  return (
    <Wrapper>
      <QuartCircleIntro theme={theme} />
      <Header />
      <IntroWrapper as={Container}>
        <Details theme={theme}>
          <h1>Shine DAO</h1>
          <h4>Next generation DeFi incubator</h4>
        <ButtonWrapper>
          <JoinButton onClick={onJoinButtonClick}>
            JOIN DISCORD
          </JoinButton>

          <LearnButton onClick={onLearnButtonClick}>
            LEARN MORE
          </LearnButton>
        </ButtonWrapper>

        </Details>
          <img width='400px' src={shineNetworkV3} alt="Shine is meant to interconnect the blockchain community" />

      </IntroWrapper>
    </Wrapper>
  );
};
