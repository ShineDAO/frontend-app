import styled from 'styled-components';

export const Wrapper = styled.div`
  background-size: contain;
  background-position: left top;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
`;

export const SkillsWrapper = styled.div`
  padding: 80px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;


  @media (max-width: 960px) {
    flex-direction: column;
    display:block;
    padding: 60px 0;
  }
`;

export const MobileHalfCircle = styled.div`
  width: 445px;
  height: 445px;
  border-radius: 50%;
  right: -290px;
  background: ${({ theme }) => (theme === 'light' ? '#EEEEFF' : '#3F3D56')}; 
  transition: 0.3s all;
  z-index: -1;
  position: absolute;
    @media (min-width: 960px) {
      display: none;
  }
`

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
