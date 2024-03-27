import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Signin2 from "./pages/Signin2";
import Main from "./pages/Main";
import { Route, Routes } from "react-router";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import ProfileUpdate from "./components/ProfileUpdate";

function App() {
  return (
    <div className="body">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/update" element={<ProfileUpdate />} />
      </Routes>
    </div>
  );
}
export default App;
