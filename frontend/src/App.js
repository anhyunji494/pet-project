import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router";
import Login from "./pages/Login/Login.js"
import Signin from "./pages/Signin/Signin.js"
import Main from "./pages/Main/Main.js";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import Header from "./components/Header/Header.js";
import ProfileUpdate from "./pages/Profile/ProfileUpdate.js";
import Post from "./pages/Post/Post.js";
import UserUpdate from "./pages/UserUpdate/UserUpdate.js";
import Chat from "./pages/Chat/chat.js";
import Test from "./pages/Test.js";
import PostsList from "./components/PostList/PostsList.js";


function App() {

  return (
    <div className="body">
      
      <Routes>
        <Route path="/" element={
        <><Header /><Main /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/google" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/update" element={<ProfileUpdate />} />
        <Route path="/post" element={<Post/>}/>
        <Route path="/userUpdate" element={<UserUpdate/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/test" element={<Test />} />
        <Route path="/postsList" element={<PostsList />} />
      </Routes>
    </div>
  );
}
export default App;
