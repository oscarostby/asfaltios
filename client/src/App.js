// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Importer sidene
import Home from './pages/main';
import PluginsList from './pages/PluginsList';
import Login from './pages/login';
import Register from './pages/register';
import Upload from './pages/upload';
import List from './pages/list';
import Profile from './pages/profile';
import BakteriaInfo from './pages/bakteriainfo';
import SimpleGoldInfo from './pages/simplegoldinfo';
import StaffPage from './pages/staffpage';
import UserIdPage from './pages/UserIdPage';
import NotFound from './pages/NotFound';
import ArchonInfo from './pages/archoninfo'; // Legg til ArchonInfo-siden
import Header from './components/header';
import ChatbotIframe from './components/ChatbotIframe'; // Juster stien hvis nødvendig

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* Header-komponenten vises på alle sider */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Plugins" element={<PluginsList />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/Plugins/:searchTerm" element={<List />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/BakteriaInfo" element={<BakteriaInfo />} />
        <Route path="/SimpleGoldInfo" element={<SimpleGoldInfo />} />
        <Route path="/staffpage" element={<StaffPage />} />
        <Route path="/adtest" element={<UserIdPage />} />

        {/* Legg til ArchonInfo-ruten */}
        <Route path="/ArchonInfo" element={<ArchonInfo />} />

        {/* Chatbot-rute */}
        <Route path="/chatbot" element={<ChatbotIframe />} />

        {/* 404-rute, alltid plassert på slutten */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
