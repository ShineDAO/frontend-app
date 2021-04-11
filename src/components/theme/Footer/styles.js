import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: 50px;
`

export const QuartCircle = styled.div`
  background-size: contain;
  border-radius: 100% 0 0 0;
  background: #EEEEFF;
  height: 400px;
  right: 0;
  width: 400px;
  position: absolute;
  bottom: -50px;
  z-index: -1;
`

export const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  @media (max-width: 680px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;

export const Links = styled.div`
  display: flex;
  align-items: center;

  a {
    margin: 0 0.5rem;

    img {
      margin: 0;
    }

    &:first-child,
    &:last-child {
      margin: 0;
    }
  }
`;

export const Details = styled.div`
  h2,
  a,
  span {
    color: #212121;
  }

  @media (max-width: 680px) {
    margin-bottom: 2rem;
  }
`;
