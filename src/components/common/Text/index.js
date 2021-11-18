import styled from "styled-components";

export const Text = styled.div`
  color: ${({ color }) => color || "black"};
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  font-size: ${({ fontSize }) => fontSize || "16px"};
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
