import styled from 'styled-components';

export const Wrapper = styled.div`
  background-size: contain;
  background-position: left top;
  background-repeat: no-repeat;
  position: relative;
  padding-bottom: 80px;
`;

export const HalfCircle = styled.div`
  width: 800px;
  height: 800px;
  border-radius: 50%;
  left: -400px;
  bottom: -445px;
  background: ${({ theme }) => (theme === 'light' ? '#EEEEFF' : '#3F3D56')};
  transition: 0.3s all;
  z-index: -1;
  position: absolute;
  @media (max-width: 960px) {
    width: 445px;
    height: 445px;
    left: -290px;
    top: 125px;
  }
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 265px;
  @media (max-width: 960px) {
    flex-direction: column;
    display: block;
  }
`;

export const UpcomingContainer = styled.div`
  margin: 0 auto;
  width: 1120px;

  @media (max-width: 960px) {
    width: 70%;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 460px;
  @media (max-width: 960px) {
    width: 100%;
    flex-direction: column;
    display: flex;
  }
`;

export const UpcomingWrapper = styled.div`
  background: white;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  display: block;
  margin: 40px 0 0 0;
  padding: 40px;
  width: 540px;
  @media (max-width: 960px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const Details = styled.div`
  flex: 1;
  padding-left: 2rem;

  @media (max-width: 960px) {
    padding-left: unset;
    width: 100%;
  }

  h1 {
    margin-bottom: 2rem;
    font-size: 24px;
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#212121')};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === 'light' ? 'unset' : 'difference')};
    }
  }

  p {
    margin-bottom: 2.5rem;
    font-size: 20px;
    font-weight: normal;
    line-height: 32px;
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#1E1E1E')};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === 'light' ? 'unset' : 'difference')};
    }
  }
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
