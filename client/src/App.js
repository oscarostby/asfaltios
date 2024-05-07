import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/main';
import PluginsList from './pages/PluginsList';
import Login from './pages/login';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PluginsList" element={<PluginsList />} />
        <Route path="/Login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;