import * as React from "react";

const followBtnCk=()=>{
    console.log('followbtn ck')
}

function FollowBtn() {
    <>
        <div className="follow-div">
            <button className="follow-btn" onClick={followBtnCk}>
                팔로우
            </button>
        </div>
    </>
}