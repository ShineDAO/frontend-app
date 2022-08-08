import styled from "styled-components";

export const Text = styled.div`
  color: ${({ color, theme }) => color || (theme === "light" ? "white" : "3F3D56")}; 
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  font-family: ${({ fontFamily }) => fontFamily || "ClashGrotesk-Regular"};
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};
  float: ${({ float }) => float || "none"};

  @media (max-width: 960px) {
    float: ${({ disableMobileFloat,float }) => disableMobileFloat? "none" : float};
    
  }
`;

export const SmallText = styled.div`
  color: ${({ color, theme }) => color || (theme === "light" ? "#a2a2a2" : "#a2a2a2")};
  font-size: 9pt;
  margin-bottom: 8px;
`;

export const SmallerText = styled.span`
  color: ${({ color, theme }) => color || (theme === "light" ? "#a2a2a2" : "#a2a2a2")};
  font-size: 9pt;
  margin-bottom: 8px;
`;


export const DegenNewsTitle = styled.h2`
  color: rgb(54 52 54);
  display: inline;
  
  @media (min-width: 960px) {
    padding-left: 10px;
  }
  @media (max-width: 960px) {
    font-size:large;
  }
`;

export const DegenNewsTitleContainer = styled.span`

  @media (max-width: 960px) {
    width:44%;
    text-align:center;
  }
`;
