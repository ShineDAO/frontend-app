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

export const StagesWrapper = styled.div`
  width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 1200px) {
    width: 70%;
    align-items: center;
  }
`;

export const HeaderWrapper = styled.div`
  align-items: center;
  justify-content: space-between;
  width: 460px;
  h4 {
    font-size: 24px;
  }
  @media (max-width: 960px) {
    flex-direction: column;
    display: block;
    text-align: center;
  }
`;

export const Infographic = styled.div`
  width: 1120px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 60px;

  @media (max-width: 1200px) {
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  h4 {
    font-size: 24px;
    line-height: 75px;
    color: ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#EEEEFF')};
  }
`;

export const ArrowWrapper = styled.div`
  @media (max-width: 1200px) {
    transform: rotate(90deg);
    margin: 20px;
  }
`;

export const DarkBubble = styled.div`
  background: ${({ theme }) => (theme === 'light' ? '#EEEEFF' : '#3F3D56')};
  width: 160px;
  height: 160px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 4px solid ${({ theme }) => (theme === 'light' ? '#EEEEFF' : '#3F3D56')};
  box-sizing: border-box;

  h4 {
    font-size: 24px;
    line-height: 75px;
    color: ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#EEEEFF')};
  }
`;

export const LightBubble = styled.div`
  background: ${({ theme }) => (theme === 'light' ? '#FFFFFF' : '#1E1E1E')};
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
  border-radius: 50%;
  text-align: center;
  border: 4px solid ${({ theme }) => (theme === 'light' ? '#EEEEFF' : '#3F3D56')};
  box-sizing: border-box;

  h4 {
    font-size: 24px;
    line-height: 75px;
    color: ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#EEEEFF')};
  }
`;

export const Bubble = styled.div`
  background: ${({ theme }) => (theme === 'light' ? '#EEEEFF' : '#3F3D56')};
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
  border-radius: 50%;
  text-align: center;
  border: 4px solid ${({ theme }) => (theme === 'light' ? '#FFFFFF' : '#1E1E1E')};
  box-sizing: border-box;

  h4 {
    font-size: 24px;
    line-height: 75px;
    color: ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#EEEEFF')};
  }
`;

export const WrapperButton = styled.div`
  text-align: center;
  margin-top: 60px;
  width: 100%;
`;