import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { LearnButton } from '../../common/Button/index';
import {
  HeaderWrapper,
  Wrapper,
  Infographic,
  DarkBubble,
  Bubble,
  LightBubble,
  WrapperButton,
  StagesWrapper, ArrowWrapper
} from './styles';

import Vector from './Vector.svg';
import LightVector from './LightVector.svg';

export const Stages = () => {
  const { theme } = useContext(ThemeContext);
  const onScrollToContact = (link) => {
    window.open(link, '_blank', 'noopener');
  };

  return (
    <Wrapper id="about">
      <StagesWrapper>
        <HeaderWrapper>
          <h4> Incubation Stages</h4>
        </HeaderWrapper>
        <Infographic>
          <Bubble theme={theme} width="160px" height="160px">
            <h4>DEAL PREP</h4>
          </Bubble>
          <ArrowWrapper>
            <img src={theme === 'light' ? Vector : LightVector} width="14,32px" height="25,02px" />
          </ArrowWrapper>
          <LightBubble theme={theme} width="160px" height="160px">
            <h4>SEED SALE</h4>
          </LightBubble>
          <ArrowWrapper>
            <img src={theme === 'light' ? Vector : LightVector} width="14,32px" height="25,02px" />
          </ArrowWrapper>
          <DarkBubble theme={theme} width="160px" height="160px">
            <h4>MISSIONS</h4>
          </DarkBubble>
          <ArrowWrapper>
            <img src={theme === 'light' ? Vector : LightVector} width="14,32px" height="25,02px" />
          </ArrowWrapper>
          <LightBubble theme={theme} width="160px" height="160px">
            <h4>IDO</h4>
          </LightBubble>
          <ArrowWrapper>
            <img src={theme === 'light' ? Vector : LightVector} width="14,32px" height="25,02px" />
          </ArrowWrapper>
          <DarkBubble theme={theme} width="160px" height="160px">
            <h4>SUPPORT</h4>
          </DarkBubble>
        </Infographic>
        <WrapperButton>
          <LearnButton onClick={() => onScrollToContact("https://docs.shinedao.finance/decentralising-startup-incubation/deal-flow")} theme={theme}>LEARN MORE</LearnButton>
        </WrapperButton>
      </StagesWrapper>
    </Wrapper>
  );
};
