import styled from 'styled-components';

export const Wrapper = styled.div`
  background: ${({ sidebar, theme, isMobile }) => ( !isMobile? 'none' : sidebar ? 'transparent' : theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(30, 30, 30, 0.5)')};
  width: 100%;
  backdrop-filter: ${({ sidebar, isMobile }) => (sidebar || !isMobile ? 'none' : 'blur(4px)')};
`;

export const Overlay = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: none;
  transition: 0.4s;
  backdrop-filter: blur(4px);
  ${({ sidebar }) =>
    sidebar &&
    `
			display: block;
			z-index: 4;	
	`}
`;
