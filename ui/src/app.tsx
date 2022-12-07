import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home, MintSite } from './views';

export const App = () => {
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

