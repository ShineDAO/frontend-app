import React from 'react';
import { Layout, SEO } from 'components/common';
import { Intro , Why, Contact, Projects, WhoAreWe, WhatIsThisAbout } from 'components/landing';

export default () => (
  <Layout>
    <SEO />
    <Intro />
    <Projects />
    <WhatIsThisAbout/>
    <WhoAreWe />
    <Why />
    <Contact />
  </Layout>
);
