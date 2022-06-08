import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  border-radius: 2px;
  border: none;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #000000;
  background: ${({ background }) => background || "#F3F669"};
  visibility: ${({ isHidden }) => (isHidden == true ? "hidden" : "visible")};

  font-weight: bold;
  font-size: 18px;
  font-family: ClashGrotesk-Regular;
  height: 48px;
  width: ${({ width }) => width || "160px"};

  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }

  &:hover {
    background: ${({ backgroundHover }) => backgroundHover || "#ECEE52"};
    color: ${({ colorOnHover }) => colorOnHover || "#3f3d56"};
    text-decoration: none;
  }

  @media (max-width: 960px) {
    height: 48px;
    width: 100%;
    left: 0px;
    top: 0px;
    border-radius: 4px;
    margin-bottom: ${({ marginBottom }) => marginBottom || "20px"};;
  }
  ${({ secondary }) =>
    secondary &&
    `
		background: #001F3F;
	`}
`
// removed from JoinBUtton
//  border: 1px solid ${({ theme }) => (theme === "light" ? "#3F3D56" : "#fff")};

export const JoinButton = styled.button`
  cursor: pointer;
  border-color: #202020;
  border-radius: 2px;
  padding: 0.6rem 0;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: ${({ theme }) => (theme === "light" ? "#3F3D56" : "#fff")};
  background: #202020;
  width: ${({ narrow }) => (narrow ? "160px" : "240px")};
  height: 48px;
  font-weight: bold;
  font-size: 18px;
  font-family: ClashGrotesk-Regular;
  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }
  &:hover {
    background: #2C2C2C;
    
  }
  ${({ secondary }) =>
    secondary &&
    `
		background: #001F3F;
	`}
  @media (max-width: 960px) {
    margin-bottom: 20px;
    border: 1px solid ${({ theme }) => (theme === "light" ? "#3F3D56" : "#fff")};
    color: ${({ theme }) => (theme === "light" ? "#3F3D56" : "#fff")};
  }
`;

export const IntroButton = styled.button`
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
  color: ${({ theme }) => (theme === "light" ? "#fff" : "#3F3D56")};
  background: ${({ theme }) => (theme === "light" ? "#3F3D56" : "#fff")};
  width: 240px;
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
    background: #fada5e;
    color: #3f3d56;
    border: 1px solid #fada5e;
  }

  ${({ secondary }) =>
    secondary &&
    `
		background: #001F3F;
	`}
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
  color: ${({ theme }) => (theme === "light" ? "#fff" : "#3F3D56")};
  background: ${({ theme }) => (theme === "light" ? "#3F3D56" : "#fff")};
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
    background: #fada5e;
    color: #3f3d56;
    border: 1px solid #fada5e;
  }
  @media (max-width: 600px) {
    width: 100%;
  }

  ${({ secondary }) =>
    secondary &&
    `
		background: #001F3F;
	`}
`;
