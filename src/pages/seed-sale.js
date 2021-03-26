import React from 'react';
import { Layout, SEO } from 'components/common';
import { Intro , Why, Contact, Projects, WhoAreWe, WhatIsThisAbout, Sale, SaleDetails } from 'components/landing';

export default () => (
  <Layout>
    <SEO />
    <Sale/>
    <SaleDetails/>
  </Layout>
);
