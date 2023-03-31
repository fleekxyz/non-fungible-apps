import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { themeGlobals } from '@/theme/globals';

import { AppPage, ToastProvider } from './components';
import { ComponentsTest, CreateAP, Home, Mint } from './views';
import { MintTest } from './views/mint-test';

export const App: React.FC = () => {
  themeGlobals();
  return (
    <>
      <HashRouter>
        <ToastProvider />
        <AppPage>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/create-ap" element={<CreateAP />} />
            <Route path="/create-ap/:id" element={<CreateAP />} />
            {/** TODO remove for release */}
            <Route path="/components-test" element={<ComponentsTest />} />
            <Route path="/mint-test" element={<MintTest />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppPage>
      </HashRouter>
    </>
  );
};
