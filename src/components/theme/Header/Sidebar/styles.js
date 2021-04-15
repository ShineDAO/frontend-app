import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  z-index: 4;
  overflow: auto;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  height: 0;
  background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#1E1E1E')};
  transition: all 350ms cubic-bezier(0.6, 0.05, 0.28, 0.91);

  ${({ active }) =>
    active &&
    `
			width: 20%;
			left: 0px;
			opacity: 1;

			@media (max-width: 960px) {
				height: 40%;
				width: 100%;
			}
	`}
`;
