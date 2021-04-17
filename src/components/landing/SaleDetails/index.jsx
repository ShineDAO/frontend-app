import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container } from 'components/common';
import tokenDistribution from 'assets/illustrations/token-distribution.png';



import { Wrapper, SkillsWrapper, Details, DisableColor, LiteparerCard } from './styles';
import {ConnectButton} from "../Sale/styles";

export const SaleDetails = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id="about">
      <SkillsWrapper as={Container}>
         <h4>Tokenomics</h4>
          <p>
            Shine total supply is <b>hard capped</b> at 100M
          </p>
        <Details theme={theme}>
          <LiteparerCard theme={theme}>
         <h3>Litepaper</h3>
          <a href="https://snapshot.org/#/shinedao.eth/proposal/QmPwhgvyiokiFMLh4wbEf6xrTZLuGLne4Q5bNPMQ5FyM1J">
            <img src={tokenDistribution} alt="Shine Tokenomics" />
          </a>
        <ConnectButton theme={theme}>
          <DisableColor href="/Litepaper.pdf" target="_blank">GO TO LITEPAPER</DisableColor></ConnectButton>
        </LiteparerCard>
       </Details>
      </SkillsWrapper>
    </Wrapper>
  );
};
