import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import CoAdmin from './pages/CoAdmin';
import Projects from './pages/Projects';
import Chat from './pages/Chat';
import Meetings from './pages/Meetings';
import Documents from './pages/Documents';
import Complaints from './pages/Complaints';
import Notices from './pages/Notices';
import Attendance from './pages/Attendance';
import Settings from './pages/Settings';
import './index.css';

function PrivateRoute({ children }) {
  const isAuth = sessionStorage.getItem('coadmin_auth') === 'true';
  return isAuth ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          <Route index           element={<CoAdmin />}    />
          <Route path="projects"     element={<Projects />}   />
          <Route path="chat"         element={<Chat />}       />
          <Route path="meetings"     element={<Meetings />}   />
          <Route path="documents"    element={<Documents />}  />
          <Route path="complaints"   element={<Complaints />} />
          <Route path="notices"      element={<Notices />}    />
          <Route path="attendance"   element={<Attendance />} />
          <Route path="settings"     element={<Settings />}   />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}