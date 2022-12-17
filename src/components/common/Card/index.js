import styled from "styled-components";

export const Card = styled.div`
  background: ${({ background }) => background || "#F3F669"};
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  height: ${({ height }) => height || "100%"};
  width: ${({ width }) => width || "100%"};
  display: ${({ display }) => display || "flex"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  box-shadow: ${({ boxShadow }) => boxShadow || "none"};
  flex-direction: ${({ flexDirection }) => flexDirection || "none"};
  flex-wrap: ${({ flexWrap }) => flexWrap || "none"};
  border: none;
  padding: ${({ padding }) => padding || "0"};
  margin: ${({ margin }) => margin || "0"};
  border: ${({ border }) => border || "none"};

  &:hover {
    background-color: #2f2f2f;
  }
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
    width: ${({ mobileWidth }) => mobileWidth || "80%"};
    margin: 0 auto;
  }
`;
