import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import DefiOptionsLogo from './defi_options_logo.png';
import {
  HalfCircle,
  UpcomingContainer,
  HeaderWrapper,
  NameWrapper,
  Wrapper,
  UpcomingWrapper,
  TotalRaise,
  FundingStage,
  When,
  BottomWrapper,
} from './styles';
import { Avatar } from '../../common/Avatar';
import { Text } from '../../common/Text';

export const UpcomingProjects = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id="about">
      <HalfCircle theme={theme} />
      <UpcomingContainer>
        <h2>Upcoming Projects</h2>
        <UpcomingWrapper theme={theme}>
          <HeaderWrapper>
            <NameWrapper onClick={() => window.open('/defi-options-dao', 'blank', 'noopener')}>
              <Avatar imageUrl={DefiOptionsLogo} alt="Defi options logo" />
              <h2>Defi Options DAO</h2>
            </NameWrapper>
            <When>
              &nbsp; &nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="#3F3D56" />
              </svg>
              <Text color="#3F3D56" fontWeight={800}>
                &nbsp; in TBA days
              </Text>
            </When>
          </HeaderWrapper>
          <BottomWrapper theme={theme}>
            <TotalRaise>
              <Text color="#3F3D56">Total raise</Text>
              <Text color="#3F3D56" fontWeight={800}>
                $150k
              </Text>
            </TotalRaise>
            <FundingStage>
              <Text color="#3F3D56">Funding stage</Text>
              <Text color="#3F3D56" fontWeight={800}>
                Seed Sale
              </Text>
            </FundingStage>
          </BottomWrapper>
        </UpcomingWrapper>
      </UpcomingContainer>
    </Wrapper>
  );
};
