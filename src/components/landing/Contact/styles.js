import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 4rem 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 960px) {
    flex-direction: column;
    align-items:center;
  }
`;

export const Details = styled.div`
  flex: 1;
  padding-right: 2rem;
  display:flex;

  @media (max-width: 960px) {
    padding-right: unset;
    width: 100%;
    order: 1;
  }
`;

export const Thumbnail = styled.div`
  flex: 1;

  @media (max-width: 960px) {
    width: 100%;
    margin-bottom: 2rem;
  }

  img {
    width: 100%;
  }
`;
