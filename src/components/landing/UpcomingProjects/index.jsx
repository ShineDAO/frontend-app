import React, { useContext } from "react";
import { ThemeContext } from "providers/ThemeProvider";
import DefiOptionsLogo from "./defi-options-dao-logo-new.png";
import { UpcomingContainer, HeaderWrapper, NameWrapper, Wrapper, UpcomingWrapper, TotalRaise, FundingStage, When, BottomWrapper, UpcomingCardContainer, GetAccessText, CtaWrapper, TBAText } from "./styles";
import { Avatar } from "../../common/Avatar";
import { Text } from "../../common/Text";
import { JoinButton } from "../../common";
//import DateCountdown from 'react-date-countdown-timer';

export const UpcomingProjects = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id="about">
      <UpcomingContainer>
        <h2>Upcoming Projects</h2>
        <UpcomingCardContainer>
          <UpcomingWrapper theme={theme} onClick={() => window.open("/kassandra", "_blank", "noopener")}>
            <HeaderWrapper>
              <NameWrapper>
                <Avatar imageUrl={"kassandra-logo-new.png"} alt="Kassandra logo" />
                <h2>Kassandra DAO</h2>
              </NameWrapper>
            </HeaderWrapper>
            <BottomWrapper theme={theme}>
              <TotalRaise theme={theme}>
                <Text fontSize="20px" color={theme === "light" ? "#3f3d56" : "white"}>
                  Total Raise
                </Text>
                <Text fontSize="24px" color={theme === "light" ? "#3f3d56" : "white"} fontWeight={800}>
                  $110k
                </Text>
              </TotalRaise>
              <FundingStage theme={theme}>
                <Text fontSize="20px" color={theme === "light" ? "#3f3d56" : "white"}>
                  Funding stage
                </Text>
                <Text fontSize="24px" color={theme === "light" ? "#3f3d56" : "white"} fontWeight={800}>
                  Private Sale
                </Text>
              </FundingStage>

              <When>
                {false && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <circle cx="4" cy="4" r="4" fill="#3F3D56" />
                  </svg>
                )}
                <TBAText style={{ margin: "0 auto" }} color="#000000" fontWeight={800}>
                  SOLD OUT
                  {false && <DateCountdown mostSignificantFigure="hour" dateTo="August 19, 2021 20:30:00 GMT+03:00" />}
                </TBAText>
              </When>
              {false && <i>Please Note: for Tier1 and Tier 2 sale is opening 15 mins after</i>}
            </BottomWrapper>
          </UpcomingWrapper>

          <UpcomingWrapper theme={theme} onClick={() => window.open("/defi-options-dao", "_blank", "noopener")}>
            <HeaderWrapper>
              <NameWrapper>
                <Avatar imageUrl={"defi-options-dao-logo-new.png"} alt="Defi options logo" />
                <h2>DeFi Options DAO</h2>
              </NameWrapper>
            </HeaderWrapper>
            <BottomWrapper theme={theme}>
              <TotalRaise theme={theme}>
                <Text fontSize="20px" color={theme === "light" ? "#3f3d56" : "white"}>
                  Total Raise
                </Text>
                <Text fontSize="24px" color={theme === "light" ? "#3f3d56" : "white"} fontWeight={800}>
                  TBA
                </Text>
              </TotalRaise>
              <FundingStage theme={theme}>
                <Text fontSize="20px" color={theme === "light" ? "#3f3d56" : "white"}>
                  Funding stage
                </Text>
                <Text fontSize="24px" color={theme === "light" ? "#3f3d56" : "white"} fontWeight={800}>
                  IDO
                </Text>
              </FundingStage>

              <When>
                {false && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <circle cx="4" cy="4" r="4" fill="#3F3D56" />
                  </svg>
                )}
                <TBAText style={{ margin: "0 auto" }} color="#000000" fontWeight={800}>
                  Date: TBA{false && <DateCountdown mostSignificantFigure="hour" dateTo="August 19, 2021 20:30:00 GMT+03:00" />}
                </TBAText>
              </When>
              {false && <i>for Tier1 and Tier 2 sale is opening 30 mins after (3:30 PM UTC)</i>}
            </BottomWrapper>
          </UpcomingWrapper>
        </UpcomingCardContainer>
      </UpcomingContainer>

      <UpcomingContainer>
        <UpcomingCardContainer>
          <UpcomingWrapper theme={theme} onClick={() => window.open("https://form.typeform.com/to/OElYo1Fe", "_blank", "noopener")}>
            <h2>Are you building a project?</h2>
            <GetAccessText>
              <Text fontSize="20px" color={theme === "light" ? "#3f3d56" : "white"}>
                Get access to active and incentivised community of contributors to polish your project.
              </Text>
            </GetAccessText>
            <CtaWrapper>
              <JoinButton theme={theme}>APPLY</JoinButton>
            </CtaWrapper>
          </UpcomingWrapper>
        </UpcomingCardContainer>
      </UpcomingContainer>
    </Wrapper>
  );
};
