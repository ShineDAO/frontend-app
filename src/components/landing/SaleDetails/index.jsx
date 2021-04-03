import React, { useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Button } from 'components/common';
import starman from 'assets/illustrations/starman.svg';
import starmanV1 from 'assets/illustrations/starman-v1.png';
import tokenomics from 'assets/illustrations/tokenomics.png';
import tokenDistribution from 'assets/illustrations/token-distribution.png';



import { Wrapper, SkillsWrapper, Details, Thumbnail, DisableColor } from './styles';

export const SaleDetails = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id="about">
      <SkillsWrapper as={Container}>

        <Details theme={theme}>
          <h1>Tokenomics</h1>
          <p>
            Shine total supply is <b>hard capped</b> at 100M
          </p>
     
          <Button>
            <DisableColor href="/Litepaper.pdf" target="_blank">Litepaper</DisableColor></Button>

        </Details>

        <Thumbnail>
          <a href="https://snapshot.org/#/shinedao.eth/proposal/QmPwhgvyiokiFMLh4wbEf6xrTZLuGLne4Q5bNPMQ5FyM1J">
            <img src={tokenDistribution} alt="Shine Tokenomics" />
          </a>

        <h5>
            Seed sale status: {" "}
            <a href="/seed-sale" target="_blank">
            Sold out
            </a>
          </h5>
        </Thumbnail>
      </SkillsWrapper>
    </Wrapper>
  );
};
