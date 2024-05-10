// App.js

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/main';
import PluginsList from './pages/PluginsList';
import Login from './pages/login';
import Register from './pages/register';
import Upload from './pages/upload';
import List from './pages/list';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Plugins" element={<PluginsList />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/Plugins/:searchTerm" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
