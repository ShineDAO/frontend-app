import React, { useState, useEffect } from "react";
import { Layout, SEO, Button, Card, Text, MobileDiv } from "components/common";
import { Header } from "components/theme";
import { SubpageNews } from "../components/common/subpages/subpageNews";
import { MoralisProvider } from "react-moralis";

export default ({ location }) => {
  return (
    <MoralisProvider appId="jTkB07PzkYA1pq8KpEaR3oDOApdmSpgJeCSXgJYF" serverUrl="https://fsnbzd9rxwph.usemoralis.com:2053/server">
      <Layout position="absolute" bottom="4px" width="100%" height="60px">
        <SEO useDegenNews="true" title="Degen News" description="Degenerate news 4 degenerate frens" />
        {false && <Header />}
        <div style={{ marginTop: 6 }}></div>
        <MobileDiv mobileWidth="100%" width="90%" background="whitesmoke" style={{ display: "flex", alignItems: "center", flexDirection: "column", paddingBottom: "200px" }}>
          <SubpageNews></SubpageNews>
        </MobileDiv>
      </Layout>
    </MoralisProvider>
  );
};
