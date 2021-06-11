import styled from 'styled-components';

export const RoundedLinkButton = styled.div`
  max-width: 200px;
  margin: 0 auto;
  width: 90%;
  border: 1px solid black;
  border-radius: 30px;
  padding-left:10px;

  display: flex;
  justify-content: left;
  align-items: center;

  @media (min-width: 601px) {
    width: 90%;
  }

  @media (min-width: 993px) {
    width: 175px;
  }
`;

export const Icon = styled.img`
  padding-right:8px;
  margin-bottom: 0rem;

`;


export const Text = styled.h5`
  display: inline-block;
  margin-bottom: 0rem;

`;



