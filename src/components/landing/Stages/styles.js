import styled from 'styled-components';

export const Wrapper = styled.div`
  background-size: contain;
  background-position: left top;
  background-repeat: no-repeat;
  position: relative;
  padding: 80px 0;
`;

export const HeaderWrapper = styled.div`
  align-items: center;
  justify-content: space-between;
  width: 460px;
  padding-bottom: 40px;
  h4 {
    font-size: 24px;
  }
  @media (max-width: 960px) {
    flex-direction: column;
    display: block;
    padding: 60px 0;
  }
`;

export const Infographic = styled.div`
width: 1120px;
text-align: center;
align-items: center;
display: flex;
justify-content: space-between;

h4 {
  font-size: 24px;
  line-height: 75px;
  color: ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#EEEEFF')}; 
}
div {
  padding-top: 40px;
}
`;

export const DarkBubble = styled.div`
background: ${({ theme }) => (theme === 'light' ? '#EEEEFF' : '#3F3D56')};
width: 160px;
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

export const LightBubble = styled.div`
background: ${({ theme }) => (theme === 'light' ? '#FFFFFF' : '#1E1E1E')};
width: 160px;
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
`;

export const Button = styled.button`
  cursor: pointer;
  border-radius: 4px;
  padding: 0.6rem 0;
  border: 1px solid white;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: ${({ theme }) => (theme === 'light' ? '#fff' : '#3F3D56')};
  background: ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#fff')};
  width: 400px;
  height: 48px;
  font-weight: bold;
  font-size: 16px;

  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }
  &:hover {
    background: #FADA5E;
    color: #3F3D56; 
    border: 1px solid #FADA5E;
  }

  ${({ secondary }) =>
    secondary &&
    `
		background: #001F3F;
	`}
`;