import React from 'react';
import { Container } from 'components/common';
import contact from 'assets/illustrations/contact.png';
import { Wrapper, Details } from './styles';
import ContactForm from './ContactForm';

export const Contact = () => (
  <Wrapper as={Container} id="contact">
    <Details>
      <ContactForm />
    </Details>
    <img width='357px' height='218px' src={contact} alt="I’m John and I’m a Backend & Devops engineer!" />
  </Wrapper>
);
