import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container } from 'components/common';
// import useIsMobile from '../../../hooks/useIsMobile';
import { Wrapper, Details } from './styles';

export const  HowToJoin = () => {
    const { theme } = useContext(ThemeContext);
    // const isMobile = useIsMobile();

return (
    <Wrapper id="about"> 
     <Container>
      <Details theme={theme}>  
      <h1>How to join?</h1>
      </Details>
     </Container>
    </Wrapper>
 );
};

