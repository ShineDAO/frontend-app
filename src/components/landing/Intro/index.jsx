import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Header } from 'components/theme';
import { Container, Button, RedButton, BlueButton } from 'components/common';
import shineNetworkV3 from 'assets/illustrations/shine-network-v3.png';

import { Wrapper, IntroWrapper, Details, ThumbnailBig, LinkJoin, LinkApply, ButtonWrapper, QuartCircleIntro } from './styles';

export const Intro = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper>
      <QuartCircleIntro />
      <Header />
      <IntroWrapper as={Container}>
        <Details theme={theme}>
          <h1>Shine DAO</h1>
          <h4>Next generation DeFi incubator aligning interests of teams and the investor community</h4>
        <ButtonWrapper>
          <LinkJoin>
          <RedButton >
            <a href="https://discord.gg/QkhbP7bZrj">JOIN DISCORD</a>
          </RedButton>
          </LinkJoin>

          <LinkApply>
          <BlueButton >
            <a href="https://v2s0c9giox5.typeform.com/to/OElYo1Fe">LEARN MORE</a>
          </BlueButton>
          </LinkApply>
        </ButtonWrapper>

        </Details>
        <ThumbnailBig>
          <img src={shineNetworkV3} alt="Shine is meant to interconnect the blockchain community" />
        </ThumbnailBig>

      </IntroWrapper>
    </Wrapper>
  );
};
