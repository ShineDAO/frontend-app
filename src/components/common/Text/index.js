import styled from "styled-components";

export const Text = styled.div`
  color: ${({ color }) => color || "black"};
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};
`;

export const SmallText = styled.div`
  color: ${({ color, theme }) => color || (theme === "light" ? "#181717" : "#181717")};
  font-size: small;
  margin-bottom: 20px;
`;
