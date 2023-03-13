import { ConnectKitButton } from 'connectkit';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { themeGlobals } from '@/theme/globals';

import { ToastProvider } from './components';
import { ComponentsTest, Home, Mint } from './views';
import { CreateAP } from './views/access-point';
import { MintTest } from './views/mint-test';
import { SVGTestScreen } from './views/svg-test'; // TODO: remove when done

export const App = () => {
  themeGlobals();
  return (
    <>
      <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
        {/* TODO remove after adding NavBar */}
        <ConnectKitButton />
      </div>
      <ToastProvider />
      <HashRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/svg" element={<SVGTestScreen />} />
          <Route path="/create-ap/:id" element={<CreateAP />} />
          {/** TODO remove for release */}
          <Route path="/components-test" element={<ComponentsTest />} />
          <Route path="/mint-test" element={<MintTest />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </HashRouter>
    </>
  );
};
