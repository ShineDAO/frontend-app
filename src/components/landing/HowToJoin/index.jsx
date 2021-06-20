import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container } from 'components/common';
// import useIsMobile from '../../../hooks/useIsMobile';
import { Wrapper, Details, JoinCard, Cards, Button, HalfCircle, WrapperButton, HowToJoinWrapper, TextLink } from './styles';

export const HowToJoin = () => {
    const { theme } = useContext(ThemeContext);
    // const isMobile = useIsMobile();

    return (
        <Wrapper id="about">
            <HowToJoinWrapper>
                <Details theme={theme}>
                    <h1>How To Join?</h1>
                    <p>
                        By acquiring a predefined amount of Shine tokens (SHN), you get the right to participate in seed sales and IDOs of incubated projects, as well as access to the investor hub.
                    </p>
                    <Cards>
                        <JoinCard theme={theme}>
                            <h2 theme={theme}>TIER 1</h2>
                            <p className="frame1" theme={theme} > &#62; 15.000 SHN </p>
                            <p className="frame2">✅   IDO  <br></br>❔   Seed-sale </p>
                            <p className="frame2">Cap/person <br></br> 1x</p>
                        </JoinCard>
                        <JoinCard theme={theme}>
                            <h2>TIER 2</h2>
                            <p className="frame1"> &#62; 50.000 SHN </p>
                            <p className="frame2">✅   IDO  <br></br>❔   Seed-sale </p>
                            <p className="frame2">Cap/person <br></br>2-4x</p>
                        </JoinCard>
                        <JoinCard theme={theme}>
                            <h2>TIER 3</h2>
                            <p className="frame1"> &#62; 200.000 SHN </p>
                            <p className="frame2">✅   IDO <br></br>✅  Seed-sale </p>
                            <p className="frame2">Cap/person <br></br> 4-8x</p>
                        </JoinCard>
                        <JoinCard theme={theme}>
                            <h2>COMMITTEE</h2>
                            <p className="frame1"> &#62; 400.000 SHN </p>
                            <p className="frame2">✅   IDO <br></br>✅  Seed-sale </p>
                            <p className="frame2">Cap/person <br></br> 8-15x</p>
                        </JoinCard>
                    </Cards>
                    <p>
                        To contribute to projects and participate in community discussions, please join our <TextLink onClick={() => window.open('https://discord.gg/QkhbP7bZrj', '_blank', 'noopener')}>Discord server.</TextLink>
                    </p>
                    <WrapperButton>
                        <Button onClick={() => window.open('https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x1c7ede23b1361acc098a1e357c9085d131b34a01&use=V2', '_blank', 'noopener')} theme={theme}>GET SHN TOKEN</Button>
                    </WrapperButton>
                </Details>
            </HowToJoinWrapper>
        </Wrapper>
    );
};


