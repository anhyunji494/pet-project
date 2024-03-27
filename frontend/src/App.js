import React, { useEffect, useState } from "react"
import Login from "./pages/Login";
import Signin from "./pages/Signin"
import Signin2 from "./pages/Signin2"
import ChatApp from "./pages/chat";
import Main from "./pages/Main";
import { Route, Routes } from "react-router";
import ProfilePage from "./components/ProfilePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/chat" element={<ChatApp />} />
      
    </Routes>
);
}
export default App
