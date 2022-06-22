import styled from 'styled-components';

export const Wrapper = styled.div`
  background-size: contain;
  background-position: left top;
  background-repeat: no-repeat;
  position: relative;
  padding-bottom: 80px;
  @media (max-width: 1200px) {
    padding-bottom: 60px;
  }
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 270px;
  @media (max-width: 699px) {
    flex-direction: column;
  }
  h2 {
    margin: 0 0 0 20px;
    @media (max-width: 495px) {
      margin: 16px 0 0 0;
    }
  }
`;

export const UpcomingContainer = styled.div`
  margin: 0 auto;
  width: 1120px;
  @media (max-width: 1200px) {
    width: 70%;
  }
  h2 {
    @media (max-width: 960px) {
      text-align: center;
    }
  }
`;

export const UpcomingCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 960px) {
    flex-direction: column;
    margin-top: 20px;
  }
`;

export const When = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #fada5e;
  
  width:100%;
  margin:0 auto;
  margin-top:25px;
  text-align: center;
  @media (max-width: 699px) {
    margin-top: 25px;
    width: 218px;
    justify-content: center;
  }
`;


export const TBAText = styled.div`
  color: ${({ color }) => color || 'black'};
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  margin: ${({ margin }) => margin || '0'};

  @media (max-width: 699px) {
    margin-top: 25px;
    width: 218px;
    justify-content: center;
    font-size: 12px;
  }
`;


export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 460px;
  @media (max-width: 960px) {
    width: 100%;
  }
  @media (max-width: 699px) {
    justify-content: center;
  }
`;

export const GetAccessText = styled.div`
  margin: 20px 0;
  @media (max-width: 960px) {
    text-align: center;
  }
`;

export const CtaWrapper = styled.div`
  display: flex;
  justify-content: right;
`;

export const BottomWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  background: ${({ theme }) => (theme === 'light' ? 'white' : '#212121')};
  @media (max-width: 960px) {
    width: 100%;
  }
  @media (max-width: 737px) {
    justify-content: center;
  }
`;

export const TotalRaise = styled.div`
  align-items: flex-start;
  justify-content: space-around;
  background: ${({ theme }) => (theme === 'light' ? '#EEEEFF' : '#3f3d56')};
  display: flex;
  height: 96px;
  flex-direction: column;
  margin: 14px 0 0 0;
  padding: 16px 0 16px 24px;
  width: 218px;
`;

export const FundingStage = styled.div`
  align-items: flex-start;
  justify-content: space-around;
  background: white;
  border: ${({ theme }) => (theme === 'light' ? '1px solid black' : '1px solid white')};
  background: ${({ theme }) => (theme === 'light' ? 'white' : '#212121')};
  display: flex;
  flex-direction: column;
  height: 96px;
  margin: 14px 0 0 0;
  padding: 16px 0 16px 24px;
  width: 218px;
`;

export const UpcomingWrapper = styled.div`
  background: ${({ theme }) => (theme === 'light' ? 'white' : '#212121')};
  border: ${({ theme }) => (theme === 'light' ? 'none' : '1px solid #3f3d56')};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  cursor: pointer;
  flex-direction: column;
  margin: 40px 0 0 0;
  padding: 40px;
  width: 540px;
  @media (max-width: 960px) {
    flex-direction: column;
    width: 100%;
    padding: 40px calc((70vw - 460px) / 2);
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 40px;
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
