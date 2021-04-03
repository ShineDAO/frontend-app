import React from 'react';
import { Layout, SEO } from 'components/common';
import { Intro , Why, Contact, Projects, WhoAreWe, WhatIsThisAbout, PreSale1, SaleDetails } from 'components/landing';

export default () => (
  <Layout>
    <SEO />
    <PreSale1/>
    <SaleDetails/>
  </Layout>
);
