import React, { useContext, useState, useEffect } from "react";
import { Layout, SEO, Button, Card, Text, MobileDiv } from "components/common";
import { Header } from "components/theme";
import { VeShnContainer } from "../components/common/subpages/veShnContainer";
import { StakingContainer } from "components/common/subpages/stakingContainer";
import { HorizontalRuler } from "components/common/HorizontalRuler";
import { ThemeContext } from "providers/ThemeProvider";
import { WalletContext } from "providers/WalletProvider";
import { ControllerPanel } from "components/common/subpages/controllerPanel";
import { SeedContainer } from "components/common/subpages/seed/seedContainer";
import { useQueryParam } from "../hooks/useQueryParam";

export default ({}) => {
  const [activeContract, setActiveContract] = useQueryParam(`tag`);

  return (
    <Layout position="absolute" bottom="4px" width="100%" height="60px">
      <SEO title="seed" description="Launch seed" />
      <Header />
      <MobileDiv mobileWidth="100%" width="90%" background="" style={{ display: "flex", alignItems: "center", flexDirection: "column", paddingBottom: "200px" }}>
        <SeedContainer activeContract={activeContract} setActiveContract={setActiveContract}></SeedContainer>
      </MobileDiv>
    </Layout>
  );
};
