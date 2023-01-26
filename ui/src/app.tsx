import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { WalletButton } from './components';
import { initializeWallet } from './store';
import { themeGlobals } from 'theme/stitches/globals';
import { Home, MintSite, MintedSiteDetail } from './views';
import { SVGTestScreen } from './views/svg-test';

initializeWallet();

export const App = () => {
  themeGlobals();
  return (
    <>
      <WalletButton />
      <BrowserRouter>
        <Routes>
          <Route path="/mint-site" element={<MintSite />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail" element={<MintedSiteDetail />} />
          <Route path="/svg" element={<SVGTestScreen />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
