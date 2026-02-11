import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Chats from "./pages/Chats";
import VideoRoom from "./pages/VideoRoom";
import Auth from "./pages/Auth"; // Make sure this file exists!

function App() {
  // Check if user is logged in (looking for a token in local storage)
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes: If not logged in, go to /auth */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/chats/:groupId" 
          element={isAuthenticated ? <Chats /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/room/:roomId" 
          element={isAuthenticated ? <VideoRoom /> : <Navigate to="/auth" />} 
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;