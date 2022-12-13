import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAppDispatch, useWalletStore, walletActions } from './store';
import { Home, MintSite } from './views';

export const App = () => {
  const dispatch = useAppDispatch();
  const { account } = useWalletStore();

  useEffect(() => {
    dispatch(walletActions.connect('metamask'));
  }, []);

  console.log('account', account);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mint-site" element={<MintSite />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
};

