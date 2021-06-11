import styled from 'styled-components';

export const Text = styled.div`
  color: ${({ color }) => color || 'black'};
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  margin: ${({ margin }) => margin || '0'};
`;
