import React, { useContext, useState, useEffect } from "react";
import { Layout, SEO, Button, Card, Text, MobileDiv } from "components/common";
import { Header } from "components/theme";
import { VeShnContainer } from "../components/common/subpages/veShnContainer";
import { StakingContainer } from "components/common/subpages/stakingContainer";
import { HorizontalRuler } from "components/common/HorizontalRuler";
import { ThemeContext } from "providers/ThemeProvider";
import { WalletContext } from "providers/WalletProvider";
import { ControllerPanel } from "components/common/subpages/controllerPanel";

export default ({ location }) => {
  const { theme } = useContext(ThemeContext);
  const { isWalletEnabled, setWalletStatus, chainId, setChainId, currentAccount, setCurrentAccount, refetchData, setRefetchData,loadingIndicator,setLoadingIndicator } = useContext(WalletContext);
  console.log("isWalletEnabled Container1 ", isWalletEnabled);
  console.log("chainId Container 1", chainId);

  return (
    <Layout position="absolute" bottom="4px" width="100%" height="60px">
      <SEO title="veSHN" description="veSHN staking" />
      <Header />

      <MobileDiv mobileWidth="100%" width="90%" background="" style={{ display: "flex", alignItems: "center", flexDirection: "column", paddingBottom: "200px" }}>
        {chainId == "0x89" || chainId== "0x13881" || (process.env.NODE_ENV == "development" && chainId == "0x539") ? (
          <div>
            <VeShnContainer isWalletEnabled={isWalletEnabled} chainId={chainId} refetchData={refetchData} setRefetchData={setRefetchData} loadingIndicator={loadingIndicator} setLoadingIndicator={setLoadingIndicator}></VeShnContainer>
            <HorizontalRuler theme={theme}></HorizontalRuler>
            <StakingContainer isWalletEnabled={isWalletEnabled} chainId={chainId}  refetchData={refetchData} setRefetchData={setRefetchData} loadingIndicator={loadingIndicator} setLoadingIndicator={setLoadingIndicator}></StakingContainer>
            <ControllerPanel isWalletEnabled={isWalletEnabled} chainId={chainId}  refetchData={refetchData} setRefetchData={setRefetchData} loadingIndicator={loadingIndicator} setLoadingIndicator={setLoadingIndicator}></ControllerPanel>
          </div>
        ) : (
          <div style={{ textAlign: "center", marginTop: 80 }}>
            <br></br>
            <Text fontWeight="600" color="red">
              Chain unsupported
            </Text>
            <br></br>
            <p style={{ marginLeft: 80, marginRight: 80 }}>
            veSHN is only available on Polygon (Matic) Network. If you have SHN on the Ethereum Mainnet, please bridge them by following these{" "}
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
