import React, { useContext } from "react";
import { ThemeContext } from "providers/ThemeProvider";

import man from "assets/illustrations/man.png";
import planet from "assets/illustrations/planet.png";
import shineNetwork from "assets/illustrations/shine-network-without-dude.png";

import { LearnButton } from "../../common/Button/index";
import useIsMobile from "../../../hooks/useIsMobile";
import { Wrapper, AboutUsWrapper, Details, WrapperButton, IllustrationMan, IllustrationShineNetwork3, IllustrationPlanet } from "./styles";

export const WhatIsThisAbout = () => {
  const { theme } = useContext(ThemeContext);
  const isMobile = useIsMobile();
  const onScrollToContact = link => {
    window.open(link, "_blank", "noopener");
  };

  return (
    <Wrapper id="about">
      <AboutUsWrapper>
        <h2>Become a Contributor ⭐^1</h2>
        <Details theme={theme}>
          <div className="what">
            <IllustrationMan src={man} alt="Towards the stars! Are you ready?" />
            <h2>Get Involved</h2>
            <p>Support new projects or bring your ideas to life.</p>
          </div>
          <div className="why">
            <IllustrationShineNetwork3 src={theme === "light" ? shineNetwork : shineNetwork} alt="Shine will get you to the moon and beyond!" />
            <h2>Expend Your Network</h2>
            <p>Meet other contributors, learn and create together.</p>
          </div>
          <div className="who">
            <IllustrationPlanet src={planet} alt="We take you to the orbit and beyond!" />
            <h2>Get Rewarded</h2>
            <p>Earn project tokens for getting shit done.</p>
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
