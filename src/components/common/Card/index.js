import styled from "styled-components";

export const Card = styled.div`
  background: ${({ background, theme }) => background || (theme === "light" ? "#fff" : "#181717")};
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  height: ${({ height }) => height || "100%"};
  width: ${({ width }) => width || "100%"};
  display: ${({ display }) => display || "flex"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  border-radius: ${({ borderRadius }) => borderRadius || "8px"};
  box-shadow: ${({ boxShadow }) => boxShadow || "none"};
  flex-direction: ${({ flexDirection }) => flexDirection || "none"};
  flex-wrap: ${({ flexWrap }) => flexWrap || "none"};
  border: ${({ border }) => border || "none"};
  padding: ${({ padding }) => padding || "0"};
  margin: ${({ margin }) => margin || "0"};
`;

export const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const MobileDiv = styled.div`
  background: ${({ background }) => background};
  width: ${({ width }) => width || "80%"};
  margin: 0 auto;
  @media (max-width: 960px) {
    width: 80%;
    margin: 0 auto;
  }
`;
