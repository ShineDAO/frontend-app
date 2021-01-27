import React, { useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Header } from 'components/theme';
import { Container, Button } from 'components/common';
import shineNetwork from 'assets/illustrations/shine-network.svg';
import { Wrapper, IntroWrapper, Details, Thumbnail, Link } from './styles';

export const Intro = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper>
      <Header />
      <IntroWrapper as={Container}>
        <Details theme={theme}>
          <h1>Shine Token</h1>
          <h4>Next level decentralized incubator for early stage crypto teams</h4>

          <Link>
          <Button >
            <a href="https://discord.gg/QkhbP7bZrj">Join our community</a> 
          </Button>
          </Link>


        
          
   
          
        </Details>
        <Thumbnail>
          <img src={shineNetwork} alt="Shine is meant to interconnect the blockchain community" />
        </Thumbnail>
      </IntroWrapper>
    </Wrapper>
  );
};
