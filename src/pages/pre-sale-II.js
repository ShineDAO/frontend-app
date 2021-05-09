import React from 'react';
import { Layout, SEO } from 'components/common';
import { Intro , Why, Contact, Projects, WhoAreWe, WhatIsThisAbout, PreSale2, SaleDetails } from 'components/landing';

export default () => (
  <Layout>
    <SEO />
    <PreSale2/>
    <SaleDetails/>
  </Layout>
);
