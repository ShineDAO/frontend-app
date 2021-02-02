import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Brand = styled.a`
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};

  @media (max-width: 960px) {
    mix-blend-mode: ${({ theme }) => (theme === 'light' ? 'unset' : 'difference')};
  }
`;


export const LogoWrapper = styled.div`
  margin-bottom:0 !important;
  height:40px !important;
`
