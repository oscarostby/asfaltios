import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/main';
import PluginsList from './pages/PluginsList';
import Login from './pages/login';
import Register from './pages/register';
import Upload from './pages/upload';
import List from './pages/list';
import Motd from './pages/UploadMessage';
import Profile from './pages/profile';


function App() {
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");

    // Assign attributes to the script element
    script.src = "https://client.crisp.chat/l.js";
    script.async = 1;

    // Append the script element to the head of the document
    document.head.appendChild(script);

    // Initialize Crisp
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "b443669e-1e11-42e5-8368-9ee6469d3fb8";
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Plugins" element={<PluginsList />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/Plugins/:searchTerm" element={<List />} />
        <Route path="/motd" element={<Motd />} />
        <Route path="/Profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
