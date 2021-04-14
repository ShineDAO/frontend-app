import styled from "styled-components";

export const Button = styled.button`
  margin-bottom:50px;
  cursor: pointer;
  border-radius: 3px;
  padding: 0.7rem 2.5rem;
  border: none;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #fff;
  background: #3F3D56;
  font-weight: bold;
  font-size: 20px;
  
  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }

  &:hover {
    background: #FADA5E;
    color: #3F3D56;
    text-decoration: none;
  }
  ${({ secondary }) =>
    secondary &&
    `
		background: #001F3F;
	`}
`;



export const JoinButton = styled.button`
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#fff')};
  padding: 0.6rem 0;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#fff')};
  background: transparent;
  width: 240px;
  font-weight: bold;
  font-size: 20px;
  margin-right: 20px;

  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }
  &:hover {
    background: #FADA5E;
    border: 1px solid #FADA5E;
  }
  ${({ secondary }) =>
    secondary &&
    `
		background: #001F3F;
	`}
  @media (max-width: 680px) {
    margin-bottom: 20px;
  }
`;
export const LearnButton = styled.button`
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
  width: 240px;
  font-weight: bold;
  font-size: 20px;

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
