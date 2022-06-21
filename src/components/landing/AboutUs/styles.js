import styled from 'styled-components';

export const Wrapper = styled.div`
  background-size: contain;
  background-position: left top;
  background-repeat: no-repeat;
  position: relative;
  padding: 80px 0;
  @media (max-width: 1200px) {
    padding: 60px 0;
  }
`;

export const AboutUsWrapper = styled.div`
  align-items: center;
  justify-content: space-between;
  width: 1120px;
  margin: 0 auto;
  @media (max-width: 1200px) {
    width: 70%;
  }

  h2 {
    font-size: 24px;
    font-weight: 800;
    line-height: 32px;
    margin: 0 0 60px 0;
  }

  @media (max-width: 960px) {
    flex-direction: column;
    display: block;
    text-align: center;
  }
`;

export const IllustrationMan = styled.img`
  width: 220px;
  height: 180px;
  @media (max-width: 960px) {
    width: 192px;
    height: 156px;
  }
`;

export const IllustrationShineNetwork3 = styled.img`
  width: 259px;
  height: 180px;
  @media (max-width: 960px) {
    width: 220px;
    height: 142px;
  }
`;

export const IllustrationPlanet = styled.img`
  width: 230px;
  height: 180px;
  @media (max-width: 960px) {
    width: 200px;
    height: 156px;
  }
`;

export const Details = styled.div`
  flex: 1;
  display: grid;
  column-gap: 60px;
  grid-template-columns: repeat(auto-fill, 330px);
  justify-content: center;

  @media (max-width: 960px) {
    padding-left: unset;
    width: 100%;
  }

  h2 {
  margin-top: 20px;
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#212121')};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === 'light' ? 'unset' : 'difference')};
    }
  }

  p {
    font-size: 20px;
    font-weight: 300;
    line-height: 32px;
    text-align: center;  
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#1E1E1E')};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === 'light' ? 'unset' : 'difference')};
      margin: 0 20px 0 20px;
    }
  }
  .what {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: 960px) {
      padding: 45px 0;
    }
  }
  .why {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: 960px) {
      padding: 45px 0;
    }
  }
  .who {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: 960px) {
      padding-top: 45px;
    }
  }
`;

export const WrapperButton = styled.div`
  text-align: center;
  margin-top: 60px;
`;
