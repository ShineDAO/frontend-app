import React, { useContext, useState, useEffect } from "react";
import { Layout, SEO, Button, Card, Text, MobileDiv } from "components/common";
import { Header } from "components/theme";
import { VeShnContainer } from "../components/common/subpages/veShnContainer";
import { StakingContainer } from "components/common/subpages/stakingContainer";
import { HorizontalRuler } from "components/common/HorizontalRuler";
import { ThemeContext } from "providers/ThemeProvider";
import { WalletContext } from "providers/WalletProvider";

export default ({ location }) => {
  const { theme } = useContext(ThemeContext);
  const { isWalletEnabled, setWalletStatus, chainId, setChainId, currentAccount, setCurrentAccount } = useContext(WalletContext);
  console.log("isWalletEnabled Container1 ", isWalletEnabled);
  console.log("chainId Container 1", chainId);

  return (
    <Layout position="absolute" bottom="4px" width="100%" height="60px">
      <SEO useDegenNews="true" title="Degen News" description="Degenerate news 4 degenerate frens" />
      <Header />

      <MobileDiv mobileWidth="100%" width="90%" background="" style={{ display: "flex", alignItems: "center", flexDirection: "column", paddingBottom: "200px" }}>
        {chainId == "0x89" ? (
          <div>
            <VeShnContainer></VeShnContainer>
            <HorizontalRuler theme={theme}></HorizontalRuler>
            <StakingContainer></StakingContainer>
          </div>
        ) : (
          <div style={{textAlign:"center", marginTop:80}}>
            <br></br>
            <Text fontWeight="600" color="red">
              Chain unsupported
            </Text>
            <br></br>
            <p style={{marginLeft:80, marginRight:80}}>
              In order to save on the gas fees, veSHN is only available when Polygon/Matic network is selected. If you have your Shine (SHN) on the Eth mainnet, please bridge them over to Polygon/Matic network by following these{" "}
              <a target="_self" href="https://shinedao.medium.com/shine-bridge-to-matic-is-live-df10f2b1d620">
                instructions
              </a>
              .
            </p>
          </div>
        )}
      </MobileDiv>
    </Layout>
  );
};
