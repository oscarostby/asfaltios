import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
        <Route path="/Profile" element={<Profile />} />
        <Route path="/BakteriaInfo" element={<BakteriaInfo />} />
        <Route path="/SimpleGoldInfo" element={<SimpleGoldInfo />} />
        <Route path="/staffpage" element={<StaffPage />} />
        <Route path="/adtest" element={<UserIdPage />} />

        {/* 404 route, always placed at the end */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;