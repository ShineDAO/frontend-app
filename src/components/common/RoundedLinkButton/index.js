import styled from 'styled-components';

export const RoundedLinkButton = styled.div`
  max-width: 200px;
  margin: 0 auto;
  width: 90%;

  padding-left:10px;

  padding-top:2px;
  padding-bottom:2px; 

  border: 1px solid ${({ theme }) => (theme === 'light' ? '#3F3D56' : '#EEEEFF')};
  box-sizing: border-box;
  border-radius: 200px;

  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 10px;

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
  padding-left:3px;

`;

export const TextContainer = styled.p`
  width:50%;

`;



export const DescriptionLinksContainer = styled.div`
    display: flex;

`;

export const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width:50%;
    height: 120px;

`;

export const DetailsTitle = styled.h3`
    margin-bottom: 0rem;
`;


