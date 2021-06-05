import React from 'react';
import { Layout, SEO } from 'components/common';
import { Intro, Why, Contact, WhoAreWe, WhatIsThisAbout } from 'components/landing';
import { UpcomingProjects } from '../components/landing/UpcomingProjects';

export default () => (
  <Layout>
    <SEO />
    <Intro />
    <UpcomingProjects />
    <WhatIsThisAbout />
    <Why />
    <WhoAreWe />
    <Contact />
  </Layout>
);
