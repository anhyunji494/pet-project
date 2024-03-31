import * as React from "react";
import "./Write.css";

const Write = ()=>{


    return (
        <>
        
        <div id="post-container">
            <div id="photo-div">
                <div id="photo-preview"></div>
                <div id="photo-upload">
                    <label id="photo-upload-btn" for="input-file">
                    파일 업로드
                    </label>
                    <input type="file" id="photo-upload-btn" style={{display:"none"}}/> 
                    {/* 기존의 input file 태그 숨김 */}
                </div>
            </div>
            <div id="txt-div">
                <textarea id="txt-input"></textarea>
                <button id="post-upload-btn">글 작성</button>
            </div>
            
        </div>


        </>

    )
}

export default Write