import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/main';
import PluginsList from './pages/PluginsList';
import Login from './pages/login';
import Register from './pages/register';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PluginsList" element={<PluginsList />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;