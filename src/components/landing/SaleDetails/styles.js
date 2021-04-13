import styled from "styled-components";

export const Wrapper = styled.div`
  background-size: contain;
  background-position: left top;
  background-repeat: no-repeat;
`;

export const SkillsWrapper = styled.div`
  padding: 4rem 0;
  align-items: center;
  justify-content: space-between;
  width: 70%;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Details = styled.div`
  flex: 1;

  @media (max-width: 960px) {
    padding-left: unset;
    width: 100%;
  }

  h1 {
    margin-bottom: 2rem;
    font-size: 26pt;
    color: ${({ theme }) => (theme === "dark" ? "#fff" : "#212121")};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === "light" ? "unset" : "difference")};
    }
  }

  p {
    margin-bottom: 2.5rem;
    font-size: 20pt;
    font-weight: normal;
    line-height: 1.3;
    color: ${({ theme }) => (theme === "dark" ? "#c7c7c7" : "#707070")};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === "light" ? "unset" : "difference")};
    }
  }
`;

export const LiteparerCard = styled.div`
  border-radius: 4px;
  padding: 40px;
  background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#1E1E1E')};
  box-sizing: border-box;
  box-shadow: ${({ theme }) => (theme === 'light' ? '0px 4px 20px rgba(0, 0, 0, 0.1)' : '0px 4px 20px rgba(255, 255, 255, 0.1)')}; 
  width: 540px;
  height: 451px;
  left: 160px;
  top: 965px;
  color: ${({ theme }) => (theme === 'light' ? '#1E1E1E' : '#fff')};
  
`;

export const Thumbnail = styled.div`
  flex: 1;

  @media (max-width: 960px) {
    width: 100%;
    margin-bottom: 2rem;
  }

  img {
    width: 100%;
  }
`;

export const DisableColor = styled.a`
  color: inherit;
`;
