import styled from "styled-components";

export const HorizontalRuler = styled.hr`
  width: 90%;
  color: ${({ theme }) => (theme === "light" ? "#3F3D56" : "#fff")};
  background-color: ${({ theme }) => (theme === "light" ? "#3F3D56" : "#fff")};
  border-color: ${({ theme }) => (theme === "light" ? "#3F3D56" : "#fff")};
  margin-top: ${({ marginTop }) => marginTop || "50px"};
  margin: 0 auto;
`;
