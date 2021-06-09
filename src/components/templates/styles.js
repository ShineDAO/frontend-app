import styled from "styled-components";

export const Wrapper = styled.div`
  background-size: contain;
  background-position: right top;
  background-repeat: no-repeat;
`;

export const Heading = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoCards = styled.div`
  display: flex;
  margin-top: 60px;
  height: 580px;
  justify-content: space-between;
`;

export const CardHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 460px;
  @media (max-width: 960px) {
    flex-direction: column;
    display: block;
    padding: 60px 0;
  }
`;

export const ProjectNameWrapper = styled.div`
  display: flex;
`;

export const CardTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

export const HeadingText = styled.div`
  font-size: 48px;
  font-weight: 800;
  margin-left: 24px;
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

export const IntroWrapper = styled.div`
  padding: 70px 0;
  @media (max-width: 960px) {
    padding: 0 30px;
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
    color: ${({ theme }) => (theme === "light" ? "#1E1E1E" : "#fff")};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === "light" ? "unset" : "difference")};
    }

    @media (max-width: 680px) {
      font-size: 30pt;
    }
  }

  h4 {
    margin-bottom: 2.5rem;
    font-size: 18pt;
    font-weight: normal;
    color: ${({ theme }) => (theme === "light" ? "#f9a72a" : "#f9a72a")};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === "light" ? "unset" : "difference")};
    }

    @media (max-width: 680px) {
      font-size: 24px;
    }
  }
`;

export const UnderlinedTitle = styled.h3`
  text-decoration: underline;
`
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
  box-shadow: ${({ theme }) => (theme === 'light' ? '0px 4px 20px rgba(0, 0, 0, 0.1)' : '0px 4px 20px rgba(255, 255, 255, 0.1)')}; 
  min-width: 500px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${({ isWalletEnabled }) => (isWalletEnabled ? 'none' : '344px')};
  color: ${({ theme }) => (theme === 'light' ? '#1E1E1E' : '#fff')};
  
  a{
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
  border:1px solid #f5f5f538;
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

//0a8e28 green
//FF4D00 red
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
  &[type="number"] {
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
    background: #FADA5E;
    color: #3F3D56; 
    border: 1px solid #FADA5E;
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
