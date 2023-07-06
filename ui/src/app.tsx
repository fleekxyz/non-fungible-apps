import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { themeGlobals } from '@/theme/globals';

import { AppPage, ToastProvider } from './components';
import {
  ComponentsTest,
  CreateAP,
  ExploreView,
  IndexedNFAView,
  Mint,
} from './views';

export const App: React.FC = () => {
  themeGlobals();
  return (
    <>
      <HashRouter>
        <ToastProvider />
        <AppPage>
          <Routes>
            <Route path="/" element={<ExploreView />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/create-ap/:id" element={<CreateAP />} />
            <Route path="/nfa/:id" element={<IndexedNFAView />} />
            {/** TODO remove for release */}
            <Route path="/components-test" element={<ComponentsTest />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppPage>
      </HashRouter>
    </>
  );
};
