import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import DefiOptionsLogo from './defi_options_logo.png';
import {
  UpcomingContainer,
  HeaderWrapper,
  NameWrapper,
  Wrapper,
  UpcomingWrapper,
  TotalRaise,
  FundingStage,
  When,
  BottomWrapper, UpcomingCardContainer, GetAccessText, CtaWrapper,
} from './styles';
import { Avatar } from '../../common/Avatar';
import { Text } from '../../common/Text';
import { JoinButton } from '../../common';

export const UpcomingProjects = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id="about">
      <UpcomingContainer>
        <h2>Upcoming Projects</h2>
        <UpcomingCardContainer>
          <UpcomingWrapper theme={theme} onClick={() => window.open('/defi-options-dao', '_blank', 'noopener')}>
            <HeaderWrapper>
              <NameWrapper>
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
              <TotalRaise theme={theme}>
                <Text fontSize="20px" color={theme === 'light' ? '#3f3d56' : 'white'}>Total raise</Text>
                <Text fontSize="24px" color={theme === 'light' ? '#3f3d56' : 'white'} fontWeight={800}>
                  $150k
                </Text>
              </TotalRaise>
              <FundingStage theme={theme}>
                <Text fontSize="20px" color={theme === 'light' ? '#3f3d56' : 'white'}>Funding stage</Text>
                <Text fontSize="24px" color={theme === 'light' ? '#3f3d56' : 'white'} fontWeight={800}>
                  Seed Sale
                </Text>
              </FundingStage>
            </BottomWrapper>
          </UpcomingWrapper>
          <UpcomingWrapper theme={theme} onClick={() => window.open('https://form.typeform.com/to/OElYo1Fe', '_blank', 'noopener')}>
            <h2>
              Are you building a project?
            </h2>
            <GetAccessText>
              <Text fontSize="20px" color={theme === 'light' ? '#3f3d56' : 'white'}>Get access to active and incentivised community of contributors from day 1 to polish your project.</Text>
            </GetAccessText>
            <CtaWrapper>
              <JoinButton theme={theme}>
                APPLY
              </JoinButton>
            </CtaWrapper>
          </UpcomingWrapper>
        </UpcomingCardContainer>
      </UpcomingContainer>
    </Wrapper>
  );
};
