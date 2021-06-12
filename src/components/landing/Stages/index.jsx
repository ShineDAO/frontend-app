import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container } from '../../common/Container/index';
import { HeaderWrapper, Wrapper, Infographic, DarkBubble, Bubble, LightBubble, Button, WrapperButton } from './styles';

import Vector from '../../landing/Stages/Vector.svg';
import LightVector from '../../landing/Stages/LightVector.svg';

export const Stages = () => {
  const { theme } = useContext(ThemeContext);
  const onScrollToContact = () => {
    window.open('https://docs.shinedao.finance/positioning', 'blank', 'noopener');
  };

  return (
    <Wrapper id="about">
      <Container>
        <HeaderWrapper>
          <h4> Incubation Stages</h4>
        </HeaderWrapper>
        <Infographic>
          <Bubble theme={theme} width="160px" height="160px">
            <h4>DEAL PREP</h4>
          </Bubble>
          <div>
            <img src={theme === 'light' ? Vector : LightVector} width="14,32px" height="25,02px" text-align="center"/>
          </div>
          <LightBubble theme={theme} width="160px" height="160px">
            <h4>SEED SALE</h4>
          </LightBubble>
          <div>
            <img src={theme === 'light' ? Vector : LightVector} width="14,32px" height="25,02px" text-align="center"/>
          </div>
          <DarkBubble theme={theme} width="160px" height="160px">
            <h4>MISSIONS</h4>
          </DarkBubble>
          <div>
            <img src={theme === 'light' ? Vector : LightVector} width="14,32px" height="25,02px" text-align="center"/>
          </div>
          <LightBubble theme={theme} width="160px" height="160px">
            <h4>IDO</h4>
          </LightBubble>
          <div>
            <img src={theme === 'light' ? Vector : LightVector} width="14,32px" height="25,02px" text-align="center"/>
          </div>
          <DarkBubble theme={theme} width="160px" height="160px">
            <h4>SUPPORT</h4>
          </DarkBubble>
        </Infographic>
        <WrapperButton>
          <Button onClick={onScrollToContact} theme={theme}>LEARN MORE</Button>
        </WrapperButton>
      </Container>
    </Wrapper>
  );
};
