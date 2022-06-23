import styled from 'styled-components';

export const RoundedLinkButton = styled.div`
  max-width: 200px;
  margin: 0 auto;
  width: 90%;

  padding-left:10px;

  padding-top:2px;
  padding-bottom:2px; 

  box-sizing: border-box;
  border-radius: 200px;

  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;

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


export const TextRoundedLinkButton = styled.h5`
  display: inline-block;
  margin-bottom: 0rem;
  padding-left:3px;

`;

export const TextContainer = styled.p`
  width:50%;
  @media (max-width: 960px) {
    width:100%;
  }
`;



export const DescriptionLinksContainer = styled.div`
    width:100%;

    display: flex;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

export const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width:50%;
    height: 120px;

    @media (max-width: 960px) {
        width:100%;
        flex-direction: row;
        height: 100%;
    }

`;

export const DetailsTitle = styled.h3`
    margin-top:60px;
    margin-bottom: 0rem;

    @media (max-width: 960px) {
        margin-top:20px;
    }
`;

export const ContributeTitle = styled.h3`
    margin-bottom: 1rem;
    
`;
export const ContributeText = styled.p`
    margin-bottom: 0rem;
    text-align: center;
    @media (max-width: 960px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const TasksSection = styled.div`
    margin-top:60px;
    width: 1120px;
    height: 152px;

    display: flex;
    justify-content: space-evenly;
    align-items: center;


    @media (max-width: 960px) {
        flex-direction: column;
        height: 192px;
        margin-top:20px;
    }

    
 

    background: ${({ theme }) => (theme === 'dark' ? '#3F3D56' : '#FFFFFF')};
    border: 1px solid ${({ theme }) => (theme === 'dark' ? '#EEEEFF' : '#3F3D56')};
    box-sizing: border-box;
    border-radius: 8px;
`;

export const ConnectButtonContainer = styled.div`
    @media (max-width: 960px) {
        width:40%;
    }
`;

export const TaskSectionTextContainer = styled.div`
    @media (max-width: 960px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;


