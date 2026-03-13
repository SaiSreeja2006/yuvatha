import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import LearningModules from './pages/LearningModules';
import AwarenessLibrary from './pages/AwarenessLibrary';
import DigitalFootprint from './pages/DigitalFootprint';
import Community from './pages/Community';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/modules" element={<LearningModules />} />
          <Route path="/library" element={<AwarenessLibrary />} />
          <Route path="/footprint" element={<DigitalFootprint />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
