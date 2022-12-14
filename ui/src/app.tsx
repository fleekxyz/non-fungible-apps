import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { WalletButton } from './components';
import { Home, MintSite } from './views';

export const App = () => {
  return (
    <>
      <WalletButton />
      <BrowserRouter>
        <Routes>
          <Route path="/mint-site" element={<MintSite />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

