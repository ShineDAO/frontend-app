import React from "react";
import { useMoralis } from "react-moralis";

import { Card, Text, Button } from "components/common";
import { loadWeb3MoralisProvider, switchMoralisChain } from "../../../utils/pagesUtils";

export function SwitchToPolygon() {
  const { Moralis } = useMoralis();
  return <Button onClick={() => switchMoralisChain(Moralis)}>Switch to Polygon</Button>;
}

export function MoralisCryptologin({ setWalletStatus, setChainId, setCurrentAccount }) {
  const { Moralis } = useMoralis();
  return (
    <Card
      onClick={() => loadWeb3MoralisProvider(Moralis, setWalletStatus, setChainId, setCurrentAccount)}
      borderRadius="4px"
      border="1px solid white"
      color="white"
      background="#1E1E1E"
      clickable
      width="100%"
      height="48px"
      margin="5px 0 0 0"
    >
      <Text fontWeight={800} color="white">
        CONNECT WALLET
      </Text>
    </Card>
  );
}
