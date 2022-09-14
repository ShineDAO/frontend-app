import React, { createContext, useState } from "react";

export const WalletContext = createContext({});

export default ({ children }) => {

  const [isWalletEnabled, setWalletStatus] = useState();
  const [chainId, setChainId] = useState("");
  const [nativeBalance, setNativeBalance] = useState();
  const [nativeTokenName, setNativeTokenName] = useState();
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
        setLoadingIndicator,
        nativeBalance,
        setNativeBalance,
        nativeTokenName,
        setNativeTokenName
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
