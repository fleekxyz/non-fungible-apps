import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { themeGlobals } from '@/theme/globals';
import { ComponentsTest, Home, Mint, Explore, CreateAP } from './views';
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
            <Route path="/explore" element={<Explore />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/create-ap" element={<CreateAP />} />
            <Route path="/create-ap/:id" element={<CreateAP />} />
            {/** TODO remove for release */}
            <Route path="/components-test" element={<ComponentsTest />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppPage>
      </HashRouter>
    </>
  );
};
