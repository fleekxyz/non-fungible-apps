import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { themeGlobals } from '@/theme/globals';
import { ComponentsTest, CreateAP, Home, Mint } from './views';
import { MintTest } from './views/mint-test';
import { AppPage, ToastProvider } from './components';

export const App = () => {
  themeGlobals();
  return (
    <>
      <HashRouter>
        <ToastProvider />
        <AppPage>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<Mint />} />
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
