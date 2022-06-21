import styled from "styled-components";

export const HorizontalRuler = styled.hr`
  width: ${({ width }) => width || "90%"};
  color: ${({ theme }) => (theme === "light" ? "#3F3D56" : "#fff")};
  background-color: ${({ color,theme }) => color || (theme === "light" ? "#3F3D56" : "#fff")};
  border-color: ${({ theme }) => (theme === "light" ? "#3F3D56" : "#fff")};
  margin-top: ${({ marginTop }) => marginTop || "50px"};
  margin: 0 auto;
  height: ${({ height }) => height || ""};
  opacity: ${({ opacity }) => opacity || ""};
  margin-bottom: ${({ marginBottom }) => marginBottom || ""};

`;
