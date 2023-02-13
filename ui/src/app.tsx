import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { initializeWallet } from './store';
import { themeGlobals } from '@/theme/globals';
import { Home, Web3AuthLogin } from './views';
import { Mint } from './views/mint';
import { SVGTestScreen } from './views/svg-test'; // TODO: remove when done

initializeWallet();

export const App = () => {
  themeGlobals();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/svg" element={<SVGTestScreen />} />
          <Route path="/login" element={<Web3AuthLogin />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
