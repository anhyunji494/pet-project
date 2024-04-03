import * as React from "react";
import Profile from "../../components/Profile/Profile.js";
import ProfilePost from "../../components/Profile/ProfilePost.js";
import  "./ProfilePage.css"

function ProfilePage(){
    return (
    <div id="pppp">
    <Profile />
    <ProfilePost/>
    <div className="body"></div>
    </div>)
}

export default ProfilePage