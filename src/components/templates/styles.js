import styled from 'styled-components';
import React from 'react';
import { Card } from '../common';

export const Wrapper = styled.div`
  background-size: contain;
  background-position: right top;
  background-repeat: no-repeat;
`;

export const Heading = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 682px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const InfoCards = styled.div`
  display: flex;
  margin-top: 60px;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 1200px) {
    justify-content: center;
  }
`;

export const StatsCard = styled.div`
  background: #3f3d56;
  padding: 40px;
  flex-direction: column;
  display: flex;
  width: 540px;
  height: 584px;
  justify-content: flex-start;
  border-radius: 8px;
  @media (max-width: 1200px) {
    margin-bottom: 40px;
  }
  @media (max-width: 600px) {
    width: 100%;
    align-items: center;
    height: 980px;
  }
  @media (max-width: 489px) {
    height: 1010px;
  }
`;

export const TokenCard = styled.div`
  background: #1e1e1e;
  padding: 40px;
  flex-direction: column;
  display: flex;
  width: 540px;
  height: 584px;
  justify-content: flex-start;
  border-radius: 8px;
  @media (max-width: 600px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    height: 784px;
  }
`;

export const TierWrapper = styled.div`

  -webkit-box-shadow: ${({ highlightTier }) => (highlightTier ? '0 0 20px 9px #fada5d' : '')};
  -moz-box-shadow: ${({ highlightTier }) => (highlightTier ? '0 0 20px 9px #fada5d' : '')};
  box-shadow: ${({ highlightTier }) => (highlightTier? '0 0 20px 9px #fada5d' : '')};

  width: 462px;
  border-radius: 10px;
  border: 1px solid #3f3d56;
  display: flex;
  background: #1e1e1e;
  height: 72px;
  margin: 24px 0 0 0;
  padding: 20px 24px;
  justify-content: space-between;
  @media (max-width: 600px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    height: 100%;
    align-items: center;
  }
`;

export const CardHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 460px;
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const CardHeaderTextWrapper = styled.div`
  border: 1px solid #3f3d56;
  background: #fada5e;
  border-radius: 4px;
  align-items: center;
  height: 32px;
  width: 140px;
  display: flex;
  @media (max-width: 600px) {
    margin-top: 20px;
    width: 218px;
  }
`;

export const CardBottomWrapper = styled.div`
  background: #3f3d56;
  flex-wrap: wrap;
  height: 336px;
  margin: 40px 0;
  border: 1px solid #3f3d56;
  border-radius: 4px;
  display: flex;
  width: 460px;
  @media (max-width: 600px) {
    margin-top: 20px;
    width: 218px;
  }
`;

export const ProjectNameWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: 600px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const FirstStatsCard = styled.div`
  align-items: flex-start;
  justify-content: space-around;
  background: white;
  display: flex;
  height: 96px;
  flex-direction: column;
  margin: 0 22px 22px 0;
  padding: 16px 0 16px 24px;
  width: 218px;
  border-radius: 8px;
  @media (max-width: 600px) {
    margin: 0 0 22px 0;
  }
`;

export const RightStatsCard = styled.div`
  align-items: flex-start;
  justify-content: space-around;
  background: 3f3d56;
  border: 1px solid white;
  display: flex;
  height: 96px;
  flex-direction: column;
  margin: 0 0 22px 0;
  padding: 16px 0 16px 24px;
  width: 218px;
  border-radius: 8px;
`;

export const LeftStatsCard = styled.div`
  align-items: flex-start;
  justify-content: space-around;
  background: 3f3d56;
  border: 1px solid white;
  display: flex;
  height: 96px;
  flex-direction: column;
  margin: 0 22px 22px 0;
  padding: 16px 0 16px 24px;
  width: 218px;
  border-radius: 8px;
  @media (max-width: 600px) {
    margin: 0 0 22px 0;
  }
`;

export const TitleText = styled.div`
  color: ${({ color }) => color || 'black'};
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  margin: ${({ margin }) => margin || '0'};
  @media (max-width: 600px) {
    text-align: center;
  }
`;

export const HeadingText = styled.div`
  font-size: 34px;
  font-weight: 800;
  margin-left: 12px;
  @media (max-width: 600px) {
    text-align: center;
  }
`;

export const StatsCardHeading = styled.div`
  color: ${({ color }) => color || 'black'};
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  margin: ${({ margin }) => margin || '0'};
  @media (max-width: 600px) {
    text-align: center;
    margin: 0;
  }
`;

export const QuartCircleIntro = styled.div`
  border-bottom-left-radius: 100%;
  background: ${({ theme }) => (theme === 'light' ? '#EEEEFF' : '#3F3D56')};
  transition: 0.3s all;
  height: 500px;
  right: 0;
  width: 500px;
  position: absolute;
  z-index: -1;

  @media (max-width: 680px) {
    display: none;
  }
`;

export const ProjectsWrapper = styled.div`
  width: 1120px;
  margin: 40px auto;
  @media (max-width: 1200px) {
    width: 70%;
  }
`;

export const LitepaperCard = styled.div`
  margin: 0 auto;
  margin-top: 80px;
  border-radius: 30px;
  box-sizing: border-box;
  left: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 965px;
  color: ${({ theme }) => (theme === 'light' ? '#1E1E1E' : '#fff')};
  a {
    font-size: 18px;
  }
  a: hover {
    text-decoration: none;
    color: #3f3d56;
  }
  @media (max-width: 960px) {
    width: 100%;
    margin-top: 40px;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 960px) {
    width: 100%;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 48px;
    line-height: 64px;
    margin-bottom: 2rem;
    color: ${({ theme }) => (theme === 'light' ? '#1E1E1E' : '#fff')};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === 'light' ? 'unset' : 'difference')};
    }

    @media (max-width: 680px) {
      font-size: 30pt;
    }
  }

  h4 {
    margin-bottom: 2.5rem;
    font-size: 18pt;
    font-weight: normal;
    color: ${({ theme }) => (theme === 'light' ? '#f9a72a' : '#f9a72a')};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === 'light' ? 'unset' : 'difference')};
    }

    @media (max-width: 680px) {
      font-size: 24px;
    }
  }
`;

export const UnderlinedTitle = styled.h3`
  text-decoration: underline;
`;
export const Thumbnail = styled.div`
  flex: 1;

  @media (max-width: 960px) {
    width: 70%;
  }

  img {
    width: 70%;
  }
`;

export const ThumbnailBig = styled.div`
  flex: 2;

  @media (max-width: 960px) {
    width: 100%;
  }

  img {
    width: 100%;
  }
`;

export const Link = styled.a`
  color: #007bff !important;
  font-weight: bold;
`;

export const ConnectWalletCard = styled.div`
  border-radius: 33px;
  padding: 40px;
  background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#1E1E1E')};
  box-sizing: border-box;
  box-shadow: ${({ theme }) =>
    theme === 'light' ? '0px 4px 20px rgba(0, 0, 0, 0.1)' : '0px 4px 20px rgba(255, 255, 255, 0.1)'};
  min-width: 500px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${({ isWalletEnabled }) => (isWalletEnabled ? 'none' : '344px')};
  color: ${({ theme }) => (theme === 'light' ? '#1E1E1E' : '#fff')};

  a {
    color: ${({ theme }) => (theme === 'light' ? '#1E1E1E' : '#fff')};
    font-size: 17px;
  }
  a: hover {
    text-decoration: none;
    color: ${({ theme }) => (theme === 'light' ? '#1E1E1E' : '#fff')};
  }
  @media (max-width: 960px) {
    min-width: 100%;
  }
`;

export const SaleCard = styled.div`
  border-radius: 33px;
  border: 1px solid #f5f5f538;
  padding: 40px;
  background-color: ${({ theme }) => (theme === 'light' ? '#EEEEFF' : '#3F3D56')};
  box-sizing: border-box;

  min-width: 500px;
  height: ${({ isWalletEnabled }) => (isWalletEnabled ? 'none' : '344px')};
  color: ${({ theme }) => (theme === 'light' ? '#1E1E1E' : '#fff')};
  margin-right: 40px;
  h3 {
    margin-bottom: 4px;
  }
  br {
    line-height: 40px;
  }
  @media (max-width: 960px) {
    margin-bottom: 40px;
    min-width: 100%;
  }
`;

// 0a8e28 green
// FF4D00 red
export const StatusContainer = styled.div`
  background: #298a3f;
  height: 32px;
  width: 104px;
  border-radius: 4px;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  margin-top: 8px;

  b {
    font-weight: 800;
    font-size: 16px;
    line-height: 20px;
    color: #fff;
  }

  @media (max-width: 680px) {
    width: 68%;
  }
`;

export const EthInput = styled.input`
  /* Disable arrows in number input for Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Disable arrows in number input for Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }

  @media (max-width: 960px) {
    width: 100%;
  }

  border: 2px solid #6c63ff;
  border-radius: 7px;
  height: 100%;
  padding: 0.5rem 0.5rem;
`;

export const ColorTitle = styled.h4`
  color: red !important;
`;

export const ConnectButton = styled.button`
  cursor: pointer;
  border-radius: 4px;
  padding: 0.6rem 0;
  border: 1px solid white;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: ${({ theme }) => (theme === 'light' ? '#fff' : '#3F3D56')};
  background: ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#fff')};
  width: 240px;
  height: 48px;
  font-weight: bold;
  font-size: 16px;

  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }
  &:hover {
    background: #fada5e;
    color: #3f3d56;
    border: 1px solid #fada5e;
  }

  ${({ secondary }) =>
    secondary &&
    `
		background: #001F3F;
	`}
  @media (max-width: 960px) {
    width: 100%;
  }
`;
