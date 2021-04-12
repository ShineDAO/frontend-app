import styled from "styled-components";

export const Wrapper = styled.div`
  background-size: contain;
  background-position: right top;
  background-repeat: no-repeat;
`;

export const IntroWrapper = styled.div`
  padding: 4rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Details = styled.div`
  flex: 1;

  @media (max-width: 960px) {
    width: 100%;
    margin-bottom: 2rem;
  }

  h1 {
    margin-bottom: 2rem;
    font-size: 36pt;
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
      font-size: 26pt;
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

export const SaleCard = styled.div`
  border-radius: 8px;
  padding: 15px;
  background-color: #ffcb0057;
`;
export const Dot = styled.div`
  width: 10px;
  height: 10px;
  background: #10b981;
  border-radius: 50%;
`;
export const StatusContainer = styled.div`
  border-radius: 8px;
  background: #ff4c4c;
  padding: 5px;
  width: 18%;
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
