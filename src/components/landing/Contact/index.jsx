import React from 'react';
import { Container } from 'components/common';
import contact from 'assets/illustrations/astronaut-dude.png';
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
    <img width="195px" height="186px" src={contact} alt="I’m John and I’m a Backend & Devops engineer!" />
  </Wrapper>
)
};
