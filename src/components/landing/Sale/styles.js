import styled from "styled-components";

export const Wrapper = styled.div`
  background-size: contain;
  background-position: right top;
  background-repeat: no-repeat;
`;

export const IntroWrapper = styled.div`
  padding: 4rem 0;
  align-items: center;
  justify-content: space-between;
  width: 70%;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Details = styled.div`
   display:flex;

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
    font-size: 32pt;
    font-weight: normal;
    color: ${({ theme }) => (theme === "light" ? "#707070" : "#e6e6e6")};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === "light" ? "unset" : "difference")};
    }

    @media (max-width: 680px) {
      font-size: 24px;
    }
  }
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

export const Link = styled.div`
  margin-top: 50px;
  a {
    color: white;
  }
  a:hover {
    color: white;
  }
`;

export const ConnectWalletCard = styled.div`
  border-radius: 4px;
  padding: 15px;
  background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#1E1E1E')};
  box-sizing: border-box;
  box-shadow: ${({ theme }) => (theme === 'light' ? '0px 4px 20px rgba(0, 0, 0, 0.1)' : '0px 4px 20px rgba(255, 255, 255, 0.1)')}; 
  min-width: 500px;
  max-width: 500px;
  height: 344px;
  color: ${({ theme }) => (theme === 'light' ? '#1E1E1E' : '#fff')};
  
  a{
    color: ${({ theme }) => (theme === 'light' ? '#1E1E1E' : '#fff')};
    font-size: 18px;
  }
  a: hover {
  text-decoration: none;
  color: ${({ theme }) => (theme === 'light' ? '#1E1E1E' : '#fff')};
}
`;

export const SaleCard = styled.div`
  border-radius: 4px;
  padding: 40px;
  background-color: ${({ theme }) => (theme === 'light' ? '#EEEEFF' : '#3F3D56')};
  box-sizing: border-box;
  min-width: 500px;
  height: 344px;
  color: ${({ theme }) => (theme === 'light' ? '#1E1E1E' : '#fff')};
  margin-right: 40px;
  h3 {
    margin-bottom: 4px;
  }
  br {
    line-height: 40px;
  }
`;

export const StatusContainer = styled.div`
  background: #FF4D00;
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
    width: 48%;
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

  border: 2px solid #6c63ff;
  border-radius: 7px;
  height: 100%;
  padding: 0.5rem 0.5rem;
`;

export const ColorTitle = styled.h4`
  color: red;
`;
