import React from 'react';
import { Container } from 'components/common';
import contact from 'assets/illustrations/contact.png';
import { Wrapper, Details } from './styles';
import ContactForm from './ContactForm';
import useIsMobile from "../../../hooks/useIsMobile";

export const Contact = () => {
  const isMobile = useIsMobile()

  return (
  <Wrapper as={Container} id="contact">
    <Details>
      <ContactForm />
    </Details>
    <img width={isMobile ? '198px' : '357px'} height={isMobile ? '124px' :'218px'} src={contact} alt="I’m John and I’m a Backend & Devops engineer!" />
  </Wrapper>
)
};
