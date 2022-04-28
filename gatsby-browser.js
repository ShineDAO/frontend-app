import React from 'react';
import ThemeProvider from 'providers/ThemeProvider';
import WalletProvider from 'providers/WalletProvider';

export const onServiceWorkerUpdateReady = () => window.location.reload(true);

export const wrapRootElement = ({ element }) => <ThemeProvider><WalletProvider>{element}</WalletProvider></ThemeProvider>;
