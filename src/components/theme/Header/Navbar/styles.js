import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: ${({ isMobile }) => (isMobile ? '0' : '1.5rem 0')};
  min-height: ${({ isMobile }) => (isMobile ? '56px' : '0')};
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


export const HeadingText = styled.span`
color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#3F3D56')};
  font-size: 20px;
  vertical-align: middle;
  font-weight: 550;
  text-decoration:none; 
  display: inline-block;
`;