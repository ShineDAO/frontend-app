import React, { useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Header } from 'components/theme';
import { Container, Button, RedButton } from 'components/common';
import shineNetwork from 'assets/illustrations/shine-network.svg';
import shineNetworkV1 from 'assets/illustrations/shine-network-v1.svg';
import shineNetworkV2 from 'assets/illustrations/shine-network-v2.svg';
import shineNetworkV3 from 'assets/illustrations/shine-network-v3.png';


import shineLogo from 'assets/illustrations/shine-logo.png';
import shineLogoV1 from 'assets/illustrations/shine-logo-v1.png';
import shineLogoV2 from 'assets/illustrations/shine-logo-v2.png';
import shineLogoV3 from 'assets/illustrations/shine-logo-v3.png';
import shineLogoV4 from 'assets/illustrations/shine-logo-v4.png';
import shineLogoV5 from 'assets/illustrations/shine-logo-v5.png';
import shineLogoV7 from 'assets/illustrations/shine-logo-v7.png';


import { Wrapper, IntroWrapper, Details, Thumbnail, ThumbnailBig, Link } from './styles';

export const Intro = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper>
      <Header />
      <IntroWrapper as={Container}>
        <Details theme={theme}>
          <h1>Shine DAO</h1>
          <h4>Next generation DeFi incubator aligning interests of teams and the investor community</h4>

          <Link>
          <RedButton >
            <a href="https://discord.gg/QkhbP7bZrj">JOIN THE COMMUNITY</a> 
          </RedButton>
          </Link>

          <Link>
          <Button >
            <a href="https://v2s0c9giox5.typeform.com/to/OElYo1Fe">APPLY FOR THE PROGRAM</a> 
          </Button>
          </Link>



          <Thumbnail>
          <img src={shineLogoV7} alt="Shine is meant to interconnect the blockchain community" />
        </Thumbnail>


   
   
          
        </Details>
        <ThumbnailBig>
          <img src={shineNetworkV3} alt="Shine is meant to interconnect the blockchain community" />
        </ThumbnailBig>
          
      </IntroWrapper>
    </Wrapper>
  );
};
