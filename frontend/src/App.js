import React, {useEffect, useState} from "react";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Signin2 from "./pages/Signin2";
import Main from "./pages/Main";
import {Route, Routes} from "react-router";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import ProfileUpdate from "./components/ProfileUpdate";
import Post from "./pages/Post";
import UserUpdate from "./pages/UserUpdate";
import Test from "./pages/Test.js";

function App() {
  return (
    <div className="body">
      
      <Routes>
        <Route path="/" element={
        <><Header /><Main /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/update" element={<ProfileUpdate />} />
        <Route path="/post" element={<Post/>}/>
        <Route path="/userUpdate" element={<UserUpdate/>}/>
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}


export default App;
