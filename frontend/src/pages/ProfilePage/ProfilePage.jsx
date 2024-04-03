import * as React from "react";
import Profile from "../../components/Profile/Profile.js";
import ProfilePost from "../../components/Profile/ProfilePost.js";
import  "./ProfilePage.css"
import Header from "../../components/Header/Header.js";

function ProfilePage(){
    return (
    <div id="ll">
       <Header />
    <div id="pppp">
    <Profile />
    <ProfilePost/>
    <div className="body"></div>
    </div>
    </div>)
}

export default ProfilePage