import styled from 'styled-components';

export const Input = styled.input`
  background-color: transparent;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#fff')};
  height: 48px;
  width: 336px;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  transition: 0.3s;

  ${({ error }) =>
    error &&
    `
		border-color: #ff4136;
	`}

  &::placeholder {
    color: #a7a7a7;
  }
`;
