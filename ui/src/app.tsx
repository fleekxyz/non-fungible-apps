import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { initializeWallet } from './store';
import { themeGlobals } from 'theme/stitches/globals';
import { Home } from './views';

initializeWallet();

export const App = () => {
  themeGlobals();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
