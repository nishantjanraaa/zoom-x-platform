import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Chats from "./pages/Chats";
import VideoRoom from "./pages/VideoRoom";
import Auth from "./pages/Auth";

// This component checks for the token EVERY time you try to visit a page
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/chats/:groupId" 
          element={<ProtectedRoute><Chats /></ProtectedRoute>} 
        />
        <Route 
          path="/room/:roomId" 
          element={<ProtectedRoute><VideoRoom /></ProtectedRoute>} 
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;