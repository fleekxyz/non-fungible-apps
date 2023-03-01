import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { themeGlobals } from '@/theme/globals';
import { Home, Mint } from './views';
import { SVGTestScreen } from './views/svg-test'; // TODO: remove when done
import { ConnectKitButton } from 'connectkit';
import { MintTest } from './views/mint-test';

export const App = () => {
  themeGlobals();
  return (
    <>
      {/* <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}> */}
      {/* TODO remove after adding NavBar */}
      {/* <ConnectKitButton /> */}
      {/* </div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/svg" element={<SVGTestScreen />} />
          <Route path="/mint-test" element={<MintTest />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
