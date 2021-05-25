import React, {useContext} from 'react';
import {ThemeContext} from 'providers/ThemeProvider';
import {Header} from 'components/theme';
import {Container, JoinButton, LearnButton} from 'components/common';
import shineNetworkV3 from 'assets/illustrations/shine-network-v3.png';
import  ShineNetworkWhite from 'assets/illustrations/Shine-Network-White.svg';
import useIsMobile from "../../../hooks/useIsMobile";

import {Wrapper, IntroWrapper, Details, ButtonWrapper, QuartCircleIntro} from './styles';

export const Intro = () => {
  const {theme} = useContext(ThemeContext);
  const isMobile = useIsMobile()
  const onJoinButtonClick = () => {
    window.open("https://discord.gg/QkhbP7bZrj", "_blank", "noopener")
  }

  const onLearnButtonClick = () => {
    window.open("https://v2s0c9giox5.typeform.com/to/OElYo1Fe", "_blank", "noopener")
  }

  return (
    <Wrapper>
      <QuartCircleIntro theme={theme}/>
      <Header/>
      <IntroWrapper as={Container}>
        {isMobile ?
          <React.Fragment>
            <Details theme={theme}>
            <h1>ShineDAO</h1>
            <h4>Next generation DeFi incubator</h4>
            <img width={isMobile ? '200px' : '400px'} src={theme === 'light' ? shineNetworkV3 : ShineNetworkWhite} alt="Shine is meant to interconnect the blockchain community"/>
            <ButtonWrapper>
              <JoinButton onClick={onJoinButtonClick} theme={theme}>
                JOIN DISCORD
              </JoinButton>

              <LearnButton onClick={onLearnButtonClick} theme={theme}>
                APPLY FOR THE PROGRAM
              </LearnButton>
            </ButtonWrapper>

          </Details>
        </React.Fragment> :
          <React.Fragment>
           <Details theme={theme}>
            <h1>ShineDAO</h1>
            <h4>Next generation DeFi incubator</h4>
            <ButtonWrapper>
              <JoinButton onClick={onJoinButtonClick} theme={theme}>
                JOIN DISCORD
              </JoinButton>

              <LearnButton onClick={onLearnButtonClick} theme={theme}>
                APPLY FOR THE PROGRAM
              </LearnButton>
            </ButtonWrapper>

          </Details>
            <img width='340px' height='260px' src={theme === 'light' ? shineNetworkV3 : ShineNetworkWhite} alt="Shine is meant to interconnect the blockchain community"/>
          </React.Fragment>}
      </IntroWrapper>
    </Wrapper>
  );
};
