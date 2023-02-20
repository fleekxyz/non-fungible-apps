import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { initializeWallet } from './store';
import { themeGlobals } from '@/theme/globals';
import { Home } from './views';
import { Mint } from './views/mint';
import { SVGTestScreen } from './views/svg-test'; // TODO: remove when done
import { ConnectKitButton } from 'connectkit';

initializeWallet();

export const App = () => {
  themeGlobals();
  return (
    <>
      <BrowserRouter>
        <ConnectKitButton />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/svg" element={<SVGTestScreen />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
