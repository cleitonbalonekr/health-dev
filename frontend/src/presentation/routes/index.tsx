import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from '@/presentation/modules/home';
const AppRoutes: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
