import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/main';
import PluginsList from './pages/PluginsList';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PluginsList" element={<PluginsList />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;