import styled from 'styled-components';

export const Wrapper = styled.div`
  background-size: contain;
  background-position: left top;
  background-repeat: no-repeat;
  position: relative;
  overflow-x: clip;
  padding: 80px 0;
  @media (max-width: 1200px) {
    padding: 60px 0;
  }
`;

export const HowToJoinWrapper = styled.div`
  width: 1120px;
  margin: 0 auto;
  @media (max-width: 1200px) {
    width: 70%;
  }
`;

export const TextLink = styled.b`
  cursor:pointer
`;

export const Details = styled.div`
  flex: 1;

  @media (max-width: 960px) {
    padding-left: unset;
    width: 100%;
  }

  h1 {
    margin-bottom: 16px;
    font-size: 24px;
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#212121')};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === 'light' ? 'unset' : 'difference')};
      text-align: center;
    }
  }

  p {
    margin: 40px 0;
    font-size: 20px;
    line-height: 32px;
    text-align: center;
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#3F3D56')};
    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === 'light' ? 'unset' : 'difference')};
    }
  }

`;

export const JoinCard = styled.div`
background: ${({ theme }) => (theme === 'dark' ? '#000000' : '#EEEEFF')};
border: 1px solid ${({ theme }) => (theme === 'light' ? '#fff' : '#3F3D56')};
font-weight: 800;
box-sizing: border-box;
height: 383px;
width: 250px;
text-align: -webkit-center;

h2 {
  background: ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#fff')};
  color: ${({ theme }) => (theme === 'light' ? '#fff' : '#3F3D56')};
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 202px;
  height: 32px;
  margin: 24px 16px 16px 16px;
}
.frame1 {
  background: ${({ theme }) => (theme === 'light' ? '#fff' : '#000000')};
  border: 1px solid ${({ theme }) => (theme === 'light' ? '#fff' : '#FFFFFF')};
  font-size: 24px;
  padding: 16px;
  width: 202px;
  height: 64px;
  margin: 16px;
}
.frame2{
  border: 2px solid ${({ theme }) => (theme === 'light' ? '#fff' : '#3F3D56')};
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  height: 96px;
  width: 202px;
  padding: 16px;
  margin: 16px;
}

  @media (max-width: 1200px) {
    margin: 20px auto;
  }
`;
export const Cards = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 1200px) {
    justify-content: center;
  }
`;

export const WrapperButton = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 490px) {
    flex-direction: column;
  }
`;