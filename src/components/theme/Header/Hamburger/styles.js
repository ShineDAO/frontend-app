import styled from 'styled-components';

export const Wrapper = styled.div`
  z-index: 5;
  top: 22px;
  right: 20px;
  display: none;
  cursor: pointer;
  transition: left 500ms cubic-bezier(0.6, 0.05, 0.28, 0.91);
  position: absolute;

  @media (max-width: 960px) {
    display: block;
  }

  ${({ sidebar }) =>
    sidebar &&
    `
			right: 18%;
			top: 22px;
		
			@media (max-width: 960px) {
				right: 20px;
				position: fixed;
			}
	`}
`;

export const Bar = styled.div`
	width: 1.6rem;
	height: 3px;
	margin-bottom: 3px;
	background-color: ${({ theme }) => (theme === 'light' ? '#1e1e1e' : '#fff')};
	transition: transform 500ms cubic-bezier(0.6, 0.05, 0.28, 0.91),
	opacity 500ms,
	box-shadow 250ms,
	background-color 500ms;

	@media (max-width: 600px){
		width: 20px;
	}

	${({ top, sidebar, theme }) =>
    top &&
    sidebar &&
		`
		background-color: ${(theme === 'light' ? '#1e1e1e' : '#fff')};
		transform: translateY(6px) rotate(-135deg);
		
	`}

	${({ mid, sidebar }) =>
    mid &&
    sidebar &&
		`
		transform: scale(0);
		`}

	${({ bottom, sidebar, theme }) =>
    bottom &&
    sidebar &&
		`
			background-color: ${(theme === 'light' ? '#1e1e1e' : '#fff')};
			transform: translateY(-6px) rotate(-45deg);
	`}
`;
