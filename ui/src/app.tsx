import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home, MintSite } from './views';
import { MintedSiteDetail } from './views/detail/detail';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mint-site" element={<MintSite />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<MintedSiteDetail />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
};

