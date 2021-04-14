import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: 50px;
`

export const QuartCircle = styled.div`
  background-size: contain;
  border-radius: 50%;
  background: ${({ theme }) => (theme === 'light' ? '#EEEEFF' : '#3F3D56')};
  transition: 0.3s all;
  right: 0;
  height: 400px;
  width: 400px;
  position: absolute;
  bottom: -50px;
  z-index: -1;
  
  @media (max-width: 960px) {
    height: 445px;
    width: 445px;
    left: -292px;
    bottom: -243.5px;
  }
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
   font-color: ${({ theme }) => (theme === 'light' ? '#1E1E1E' : '#fff')};

  }

  @media (max-width: 680px) {
    margin-bottom: 2rem;
  }
`;
