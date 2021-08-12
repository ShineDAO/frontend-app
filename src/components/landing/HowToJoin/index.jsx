import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { LearnButton } from 'components/common';
// import useIsMobile from '../../../hooks/useIsMobile';
import { Wrapper, Details, JoinCard, Cards, WrapperButton, HowToJoinWrapper, TextLink } from './styles';
import * as utils from './../../templates/utils';

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
                            <p className="frame2" theme={theme}>  {theme === 'light' ? '❓' : '❔'}  Seed-sale <br></br> ✅   IDO  </p>
                            <p className="frame2">Cap/person <br></br> 1x</p>
                        </JoinCard>
                        <JoinCard theme={theme}>
                            <h2>TIER 2</h2>
                            <p className="frame1"> &#62; 50.000 SHN </p>
                            <p className="frame2"> {theme === 'light' ? '❓' : '❔'}  Seed-sale <br></br> ✅   IDO </p>
                            <p className="frame2">Cap/person <br></br>2-4x</p>
                        </JoinCard>
                        <JoinCard theme={theme}>
                            <h2>TIER 3</h2>
                            <p className="frame1"> &#62; 200.000 SHN </p>
                            <p className="frame2">✅  Seed-sale  <br></br>✅   IDO</p>
                            <p className="frame2">Cap/person <br></br> 4-8x</p>
                        </JoinCard>
                        <JoinCard theme={theme}>
                            <h2>COMMITTEE</h2>
                            <p className="frame1"> &#62; 400.000 SHN </p>
                            <p className="frame2">✅  Seed-sale  <br></br>✅   IDO </p>
                            <p className="frame2">Cap/person <br></br> 8-15x</p>
                        </JoinCard>
                    </Cards>
                    <p>
                        To contribute to projects and participate in community discussions, please join our <TextLink onClick={() => window.open('https://discord.gg/QkhbP7bZrj', '_blank', 'noopener')}>Discord server.</TextLink>
                    </p>
                    <WrapperButton>
                        <LearnButton onClick={() => window.open('https://v2.info.uniswap.org/pair/0x165c6e50ed0ced21c0192fac26c1affb0dea5c28', '_blank', 'noopener')} theme={theme}>GET SHN TOKEN</LearnButton>
                        <LearnButton theme={theme} onClick={() => utils.addToWatchlist({
                            "address": "0x1C7ede23b1361acC098A1e357C9085D131b34a01", // The address that the token is at.
                            "symbol": "SHN", // A ticker symbol or shorthand, up to 5 chars.
                            "decimals": 18, // The number of decimals in the token
                            "image": "https://i.ibb.co/mRKYzwB/shine-logo-256.png", // A string url of the token logo
                        })}>Add SHN to MetaMask</LearnButton>
                    </WrapperButton>

                </Details>
            </HowToJoinWrapper>
        </Wrapper>
    );
};


