import React, { useEffect, useState } from "react"
import Login from "./pages/Login";
import Signin from "./pages/Signin"
import Signin2 from "./pages/Signin2"
import Main from "./pages/Main";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signin2" element={<Signin2 />} />
    </Routes>
);
}
export default App
