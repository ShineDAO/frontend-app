import React from 'react';
import { Layout, SEO } from 'components/common';
import { Intro, Why, Contact, WhoAreWe, WhatIsThisAbout } from 'components/landing';
import { UpcomingProjects } from '../components/landing/UpcomingProjects';
import { Stages } from '../components/landing/Stages';
 
export default () => (
  <Layout>
    <SEO />
    <Intro />
    <UpcomingProjects />
    <Stages />
    <WhatIsThisAbout />
    <Why />
    <WhoAreWe />
    <Contact />
  </Layout>
);
