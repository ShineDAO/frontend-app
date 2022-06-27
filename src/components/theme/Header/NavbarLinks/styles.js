import styled from 'styled-components';

export const Wrapper = styled.div`
  a {
    color: ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#fff')};
    text-decoration: none;

		@media (max-width: 960px) {
			color: ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#fff')};
		}
  }

  a:hover {
	color: ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#fff')};
  }
  ${({ desktop }) =>
    desktop
      ? `
			align-items: center;
			display: flex;

			@media (max-width: 960px) {
					display: none;
			}

			a {
				    color: ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#fff')};
					margin-right: 3rem;
					font-size: 18px;
					line-height: 24px;

					&:last-child {
							margin-right: unset;
					}
					font-weight: bold;
			}
			
			a:hover {
				color: ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#fff')};
			}
		`
      : `
			padding: 3rem;
			display: flex;
			flex-direction: column-reverse;

			a {
					margin-bottom: 1rem;

					&:last-child {
							margin-bottom: unset;
					}
			}
	`}
`;
