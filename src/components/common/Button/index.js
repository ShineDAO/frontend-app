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



export const RedButton = styled.button`
 margin-bottom:50px;
  cursor: pointer;
  border-radius: 3px;
  border: 3px solid #3F3D56;
  padding: 0.7rem 2.5rem;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #3F3D56;
  background: transparent;
  width: 330px;

  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }
  &:hover {
    background: #FADA5E;
    color: #fff;
    border: 3px solid #FADA5E;
  }
  ${({ secondary }) =>
    secondary &&
    `
		background: #001F3F;
	`}
`;
export const BlueButton = styled.button`
  cursor: pointer;
  border-radius: 3px;
  padding: 0.7rem 2.5rem;
  border: 3px solid #3F3D56;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #fff;
  background: #3F3D56;
  width:330px;

  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }
  &:hover {
    background: #FADA5E;
    color: #3F3D56; 
    border: 3px solid #FADA5E;
  }

  ${({ secondary }) =>
    secondary &&
    `
		background: #001F3F;
	`}
`;
