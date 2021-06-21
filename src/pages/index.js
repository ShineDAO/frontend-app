import React from 'react';
import { Layout, SEO } from 'components/common';
import { Intro, Contact, WhatIsThisAbout } from 'components/landing';
import { UpcomingProjects } from '../components/landing/UpcomingProjects';
import { Stages } from '../components/landing/Stages';
import { HowToJoin } from '../components/landing/HowToJoin';
 
export default () => (
  <Layout>
    <SEO />
    <Intro />
    <UpcomingProjects />
    <Stages />
    <WhatIsThisAbout />
    <HowToJoin />
    <Contact />
  </Layout>
);
