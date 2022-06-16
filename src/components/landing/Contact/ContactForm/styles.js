import styled from 'styled-components';

export const Error = styled.span`
  color: #ff4136;
`;

export const Center = styled.div`
  text-align: left;

  h4 {
    font-weight: normal;
  }
`;

export const InputField = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const InputFieldCaptcha = styled.div`
  position: absolute;
  margin-bottom: 1rem;
  @media (max-width: 960px) {
    width: 70%;
  }
`;

export const Details = styled.div`
  flex: 1;

  @media (max-width: 960px) {
    padding-left: unset;
    width: 70%;
  }

  h1 {
    margin-bottom: 25px;
    font-size: 24px;
    line-height: 35px;
    align-items:center;
    font-weight: 800;
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#1E1E1E')};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === 'light' ? 'unset' : 'difference')};
      font-size: 18px;
      line-height: 24px;
      padding-top: 0rem;
    }
  }

  p {
    font-size: 20px;
    font-weight: normal;
    line-height: 32px;
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#1E1E1E')};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ theme }) => (theme === 'light' ? 'unset' : 'difference')};
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

export const ContactFormContainer = styled.div`
  display: flex;

  @media (max-width: 960px) {
   display: block;
  }
`
