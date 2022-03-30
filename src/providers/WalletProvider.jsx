import React, { createContext, useState } from "react";

export const WalletContext = createContext({});

export default ({ children }) => {
  console.log("hgjashdkjs");

  const [isWalletEnabled, setWalletStatus] = useState();
  const [chainId, setChainId] = useState("0x89");
  const [currentAccount, setCurrentAccount] = useState(null);

  return (
    <WalletContext.Provider
      value={{
        isWalletEnabled,
        setWalletStatus,
        chainId,
        setChainId,
        currentAccount,
        setCurrentAccount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
