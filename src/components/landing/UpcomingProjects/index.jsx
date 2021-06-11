import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Card, Container } from 'components/common';
import DefiOptionsLogo from './defi_options_logo.png';
import { HalfCircle, HeaderWrapper, NameWrapper, Wrapper } from './styles';
import { Avatar } from '../../common/Avatar';
import { Text } from '../../common/Text';

export const UpcomingProjects = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id="about">
      <HalfCircle theme={theme} />
      <Container>
        <h2>Upcoming Projects</h2>
        <Card
          background="white"
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1);"
          display="block"
          margin="40px 0 0 0"
          padding="40px"
          theme={theme}
          width="540px"
        >
          <HeaderWrapper>
            <NameWrapper>
              <Avatar imageUrl={DefiOptionsLogo} alt="Defi options logo" />
              <h2>Defi Options DAO</h2>
            </NameWrapper>
            <Card background="#fada5e" borderRadius="4px" height="32px" width="140px">
              &nbsp; &nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="#3F3D56" />
              </svg>
              <Text color="#3F3D56" fontWeight={800}>
                &nbsp; in 4 days
              </Text>
            </Card>
          </HeaderWrapper>
          <Card background="white">
            <Card
              alignItems="flex-start"
              justifyContent="space-around"
              background="#EEEEFF"
              display="flex"
              height="96px"
              flexDirection="column"
              margin="24px 24px 0 0"
              padding="16px 0 16px 24px"
              width="218px"
            >
              <Text color="#3F3D56">Total raise</Text>
              <Text color="#3F3D56" fontWeight={800}>
                $200k
              </Text>
            </Card>
            <Card
              alignItems="flex-start"
              justifyContent="space-around"
              background="white"
              border="1px solid #3F3D56"
              display="flex"
              flexDirection="column"
              height="96px"
              margin="24px 0 0 0"
              padding="16px 0 16px 24px"
              width="218px"
            >
              <Text color="#3F3D56">Funding stage</Text>
              <Text color="#3F3D56" fontWeight={800}>
                Seed Sale
              </Text>
            </Card>
          </Card>
        </Card>
      </Container>
    </Wrapper>
  );
};
