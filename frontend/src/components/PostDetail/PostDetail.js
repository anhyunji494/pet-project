import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostDetail.css";

const PostDetail = ({ post_idx }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [text, setText] = useState("");
    const [postAuthorNick, setPostAuthorNick] = useState("");
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = Math.floor(seconds / 31536000);

        if (interval >= 1) {
            return interval + "년 전";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            return interval + "달 전";
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval + "일 전";
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval + "시간 전";
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval + "분 전";
        }
        return Math.floor(seconds) + "초 전";
    };

    // 댓글 불러오기
    const fetchComments = async () => {
        try {
            const response = await axios.get(`/comments/${post_idx}`);
            setComments(response.data);
        } catch (error) {
            console.error("댓글 불러오기 오류:", error);
        }
    };

    // 댓글 기능
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    // 새로운 댓글 작성
    const handleReply = async () => {
        try {
            const response = await axios.post(`/comments/new/${post_idx}`, {
                cmt_content: comment,
            });
            setComment("");
            fetchComments();
        } catch (error) {
            console.error("오류:", error);
        }
    };

    /// 포스트 정보 불러오기
    const fetchPostInfo = async () => {
        try {
            const response = await axios.get(`/post/${post_idx}`);
            const postData = response.data;

            // 사진 URL 추출
            const photoFiles = postData.map(post => {
                if (Array.isArray(post.file_rname)) {
                    return post.file_rname.map(item => item.file_rname);
                } else if (post.file_rname) {
                    return [post.file_rname];
                } else {
                    return [];
                }
            }).flat(); // 2차원 배열 평탄화

            // 사진 URL을 상태에 저장
            setPhotos(photoFiles);

            // 포스트 정보 설정
            const firstPost = postData[0];
            setPostAuthorNick(firstPost.user_nick);
            setText(firstPost.post_content);

            // 첫 번째 이미지 정보 표시
            if (photoFiles.length > 0) {
                const firstPhoto = photoFiles[0];
                // 이미지 표시 또는 처리
            }
        } catch (error) {
            console.error("포스트 정보 불러오기 오류:", error);
        }
    };



    useEffect(() => {
        fetchPostInfo();
        fetchComments();
    }, [post_idx]);

    // 다음 버튼
    const handleNextPost = () => {
        const nextIndex = currentPhotoIndex + 1;
        if (nextIndex < photos.length) {
            setCurrentPhotoIndex(nextIndex);
        } else {
            console.error("마지막 사진입니다.");
        }
    };
    // 이전 버튼
    const handlePrevPost = () => {
        const prevIndex = currentPhotoIndex - 1;
        if (prevIndex >= 0) {
            setCurrentPhotoIndex(prevIndex);
        } else {
            console.error("첫 번째 사진입니다.");
        }
    };

    return (
        <div id="newBody">
            <div id="container-postdetail">
                <div id="container-profile-div">
                    <div id="container-profile-photo"></div>
                    &nbsp;&nbsp;
                    <div id="container-profile-text">
                        <div id="container-profile-nick">{postAuthorNick}</div>
                        <div id="container-profile-badge"></div>
                    </div>
                </div>
                <div id="container-contents">
                    {/* <div id="photo"> */}
                        {photos.map((photo, index) => (
                            // <div>
                                <img
                                    key={index}
                                    src={photo}
                                    alt={`포스트 이미지 ${index}`}
                                    style={{ display: index === currentPhotoIndex ? "block" : "none" }}
                                    id="photo-idv-detail"
                                />
                            // </div>
                        ))}
                    {/* </div> */}
                   
                </div>
                <div className="move_btn">
                    <button onClick={handlePrevPost}>◀</button>
                    <button onClick={handleNextPost}>▶</button>
                </div>
            </div>

            {/* 전체 댓글영역 */}
            <div id="container-postdetail">
                {/* 작성된 댓글 영역 */}
                <div id="txt">{text}</div>

                <div id="comment-list">
                    {comments.map((comment) => (
                        <div key={comment.id} className="comment__body">
                            <div className="comment__info">
                                <div className="comment__author">{comment.user_nick}</div>
                                <div className="comment__date">({timeAgo(comment.created_at)})</div>
                            </div>
                            <div className="comment__text">{comment.cmt_content} </div>

                        </div>
                    ))}
                </div>
                {/* 댓글영역 작성 */}
                <div id="reply-box">
                    <div id="newcomment__form">
                        <textarea placeholder="Write a comment"
                            id="message-input-txt"
                            value={comment}
                            name="cmt_content"
                            onChange={handleCommentChange}
                        ></textarea>
                        <div class="newcomment__toolbar">
                            <button
                                id="reset-button" class="button--secondary"
                                tabindex="3" type="reset">
                                Reset
                            </button>
                            <button
                                id="confirm-button" class="button--primary"
                                tabindex="2" type="submit" onClick={handleReply}>
                                Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*<button onClick={handlePrevPost} disabled={currentPhotoIndex === 0}>이전 포스트</button>*/}
            {/*<button onClick={handleNextPost} disabled={currentPhotoIndex === photos.length - 1}>다음 포스트</button>*/}
        </div>
    );
};

export default PostDetail;
