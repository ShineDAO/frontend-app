import styled from 'styled-components';

/* components */
const Image = styled.img`
  display: block;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid #ddd;
  padding: 2px;
  width: ${({ width }) => width || '60px'};
  height: ${({ height }) => height || '60px'};
  background-color: white;
`;

export default {
  Image,
  Wrapper,
};
