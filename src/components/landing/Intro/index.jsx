import React, { useContext } from "react";
import { ThemeContext } from "providers/ThemeProvider";
import { Header } from "components/theme";
import { Container, JoinButton, IntroButton, LearnButton } from "components/common";
import shineAnimatedRocket from "assets/illustrations/shineAnimatedRocket.gif";
import useIsMobile from "../../../hooks/useIsMobile";

import { Wrapper, IntroWrapper, Details, ButtonWrapper, LandingIllustration } from "./styles";

export const Intro = () => {
  const { theme } = useContext(ThemeContext);
  const isMobile = useIsMobile();
  const onJoinButtonClick = () => {
    window.open("/onboarding", "_blank", "noopener");
  };

  const onLearnButtonClick = () => {
    window.open("https://docs.shinedao.finance/", "_blank", "noopener");
  };

  return (
    <Wrapper>
      <Header />
      <IntroWrapper as={Container}>
        {isMobile ? (
          <React.Fragment>
            <Details theme={theme}>
              <h1>Decentralised Web3 Incubator</h1>
              <h4>ShineDAO makes it easy for contributors to get involved with new promising Web3 projects, and get rewarded with their tokens.</h4>
              <ButtonWrapper>
                <JoinButton onClick={onJoinButtonClick} theme={theme}>
                  JOIN US
                </JoinButton>

                {false && (
                  <LearnButton onClick={onLearnButtonClick} theme={theme}>
                    LEARN MORE
                  </LearnButton>
                )}
              </ButtonWrapper>
              <LandingIllustration src={theme === "light" ? shineAnimatedRocket : shineAnimatedRocket} alt="Shine is meant to interconnect the blockchain community" />
            </Details>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Details theme={theme}>
              <h1>Decentralised Web3 Incubator</h1>
              <h4>ShineDAO makes it easy for contributors to get involved with new promising Web3 projects, and get rewarded with their tokens.</h4>
              <ButtonWrapper>
                <JoinButton onClick={onJoinButtonClick} theme={theme}>
                JOIN US
                </JoinButton>

                {false && (
                  <IntroButton onClick={onLearnButtonClick} theme={theme}>
                    LEARN MORE
                  </IntroButton>
                )}
              </ButtonWrapper>
            </Details>
            <LandingIllustration src={theme === "light" ? shineAnimatedRocket : shineAnimatedRocket} alt="Shine is meant to interconnect the blockchain community" />
          </React.Fragment>
        )}
      </IntroWrapper>
    </Wrapper>
  );
};
