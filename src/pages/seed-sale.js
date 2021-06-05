import React from 'react';
import { Layout, SEO } from 'components/common';
import { Sale, SaleDetails } from 'components/landing';

export default () => (
  <Layout>
    <SEO />
    <Sale />
    <SaleDetails />
  </Layout>
);
