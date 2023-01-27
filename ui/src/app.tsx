import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { initializeWallet } from './store';
import { themeGlobals } from '@/theme/globals';
import { Home } from './views';
import { Mint } from './views/mint';

initializeWallet();

export const App = () => {
  themeGlobals();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
