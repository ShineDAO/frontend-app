import styled from 'styled-components';

export const Wrapper = styled.div`
  background-size: contain;
  background-position: left top;
  background-repeat: no-repeat;
`;

export const SkillsWrapper = styled.div`
  padding: 80px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;

  @media (max-width: 960px) {
    flex-direction: column;
    padding: 60px 0;
  }
`;

export const Details = styled.div`
  flex: 1;
  padding-left: 2rem;

  @media (max-width: 960px) {
    padding-left: unset;
    width: 100%;
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
