import React, { createContext, useState } from "react";

export const WalletContext = createContext({});

export default ({ children }) => {

  const [isWalletEnabled, setWalletStatus] = useState();
  const [chainId, setChainId] = useState("0x89");
  const [currentAccount, setCurrentAccount] = useState(null);
  const [refetchData, setRefetchData] = useState(false);
  const [loadingIndicator, setLoadingIndicator] = useState(["none"]);


  return (
    <WalletContext.Provider
      value={{
        isWalletEnabled,
        setWalletStatus,
        chainId,
        setChainId,
        currentAccount,
        setCurrentAccount,
        refetchData,
        setRefetchData,
        loadingIndicator,
        setLoadingIndicator
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
