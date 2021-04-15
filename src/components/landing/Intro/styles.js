import styled from 'styled-components';

export const QuartCircleIntro = styled.div`
  border-bottom-left-radius:100%;
  background: ${({ theme }) => (theme === 'light' ? '#EEEEFF' : '#3F3D56')};
  transition: 0.3s all;
  height: 500px;
  right: 0;
  width: 500px;
  position: absolute;
  z-index: -1;
  
  @media (max-width: 680px) {
    right: -40px;
    top: -40px;
    height: 300px;
    width: 300px;
  }
`;

export const Wrapper = styled.div`
  background-size: contain;
  background-position: right top;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
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
    margin-bottom: 1rem;
    font-size: 48px;
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
    font-size: 28px;
    font-weight: normal;
    color: ${({ theme }) => (theme === 'light' ? '#1E1E1E' : '#FFF')};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === 'light' ? 'unset' : 'difference')};
    }

    @media (max-width: 680px) {
      font-size: 28px;
    }
  }
`;


export const Thumbnail = styled.div`
  flex: 1;

  @media (max-width: 960px) {
    width: 100%;
  }

  img {
    width: 100%;
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

export const ButtonWrapper = styled.div`
  display: flex;
  margin: 0.7em 1.5em;
  @media (max-width: 680px) {
    display: block;
  }
`;
