import React, { useState, useEffect } from "react";
import { MoralisProvider } from "react-moralis";


import { Layout, SEO  } from "components/common";
import { Header } from "components/theme";

import { SubpageOnboarding } from "../components/common/subpages/subpageOnboarding";


export default ({ location }) => {


  return (
    <MoralisProvider appId="jTkB07PzkYA1pq8KpEaR3oDOApdmSpgJeCSXgJYF" serverUrl="https://fsnbzd9rxwph.usemoralis.com:2053/server">
      <Layout position="absolute" bottom="4px" width="100%" height="60px">
        <SEO />
        <Header />
        <SubpageOnboarding location={location}></SubpageOnboarding>
      </Layout>
    </MoralisProvider>
  );
};