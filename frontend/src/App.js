import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import "./Global.css"
import NavBar from './pages/NavBar';
import AddPatientForm from './components/AddPatientForm.mjs';
import { PrivateRoute } from './components/PrivateRoute';
function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={
          <PrivateRoute>
        <DashboardPage />
          </PrivateRoute>
        } />
        <Route path="/add-patient" element={
        <PrivateRoute>
        <AddPatientForm />
        </PrivateRoute>
        
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
