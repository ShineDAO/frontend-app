import React, { useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Button } from 'components/common';
import starman from 'assets/illustrations/starman.svg';
import starmanV1 from 'assets/illustrations/starman-v1.png';
import tokenomics from 'assets/illustrations/tokenomics.png';
import tokenDistribution from 'assets/illustrations/token-distribution.png';



import { Wrapper, SkillsWrapper, Details, Thumbnail, DisableColor, LiteparerCard } from './styles';

export const SaleDetails = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id="about">
      <SkillsWrapper as={Container}>
      
        <Details theme={theme}>
          <h4>Tokenomics</h4>
          <p>
            Shine total supply is <b>hard capped</b> at 100M
          </p>
          <LiteparerCard theme={theme}>
         <h5>Litepaper</h5>
          <a href="https://snapshot.org/#/shinedao.eth/proposal/QmPwhgvyiokiFMLh4wbEf6xrTZLuGLne4Q5bNPMQ5FyM1J">
            <img src={tokenDistribution} alt="Shine Tokenomics" />
          </a>
        <Button>
          <DisableColor href="/Litepaper.pdf" target="_blank">GO TO LITEPAPER</DisableColor></Button>
        </LiteparerCard>
       </Details> 
      </SkillsWrapper>
    </Wrapper>
  );
};
