import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import FunMode from './pages/FunMode';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing dashboard */}
        <Route path="/" element={<Dashboard />} />
        {/* Existing Normal Mode */}
        <Route path="/normal-mode" element={<Home />} />
        {/* Fun Mode placeholder */}
        <Route path="/fun-mode" element={<FunMode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
