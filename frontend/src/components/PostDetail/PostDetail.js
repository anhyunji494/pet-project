import React, {useState, useEffect} from "react";
import axios from "axios";
import "./PostDetail.css";

const PostDetail = ({post_idx}) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const [photos, setPhotos] = useState([]);
    const [text, setText] = useState("");

    // created_at을 몇 분 전 또는 몇 초 전으로 변환하는 함수 인스타 따라한거
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

    // 댓글 목록을 가져오는 함수
    const fetchComments = async () => {
        try {
            const response = await axios.get(`/comments/${post_idx}`);
            setComments(response.data);
        } catch (error) {
            console.error("댓글 불러오기 오류:", error);
        }
    };

    // 컴포넌트가 마운트될 때와 post_idx가 변경될 때 댓글 목록을 가져옴
    useEffect(() => {
        const fetchPostInfo = () => {
            axios.get(`/post/${post_idx}`)
                .then(response => {
                    const { file_rname, post_content } = response.data;
                    setPhotos(file_rname ? [file_rname] : []);
                    setText(post_content);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("포스트 정보 불러오기 오류:", error);
                });
        };
        fetchPostInfo();
        fetchComments();
    }, [post_idx]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleReply = async () => {
        console.log("댓글 작성 요청");

        try {
            const response = await axios.post(`/comments/new/${post_idx}`, {
                cmt_content: comment,
            });
            console.log("응답 받기 성공");
            console.log(response.data);
            setComment("");
            fetchComments(); // 댓글 작성 후 댓글 목록 다시 가져오기
        } catch (error) {
            console.error("오류:", error);
        }
    };

    return (
        <div id="newBody">
            <div id="container-postdetail">
                <div id="container-profile-div">
                    <div id="container-profile-photo"></div>
                    &nbsp;&nbsp;
                    <div id="container-profile-text">
                        <div id="container-profile-nick">닉네임</div>
                        <div id="container-profile-badge"></div>
                    </div>
                </div>
                <div id="container-contents">
                    <div id="photo">사진</div>
                    <div id="txt">텍스트</div>
                    {/*<div id="photo"> 이 부분 수정하면될거같아요*/}
                    {/*    {photos.length > 0 && photos.map((photo, index) => (*/}
                    {/*        <img key={index} src={photo.file_rname} alt={`포스트 이미지 ${index}`}/>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    {/*<div id="txt">{text}</div>*/}
                </div>
            </div>
            <div id="container-postdetail">
                <div id="reply-box">
                    <div id="reply">댓글</div>
                    <div id="message-input-box">
                        <textarea
                            id="message-input-txt"
                            value={comment}
                            name="cmt_content"
                            onChange={handleCommentChange}
                        ></textarea>
                        <button id="message-input-btn" onClick={handleReply}>
                            입력
                        </button>
                    </div>
                </div>
                {/* 댓글 목록 출력 */}
                <div id="comment-list">
                    {comments.map((comment) => (
                        <div key={comment.id}>
                            <div>
                                {comment.user_nick}: {comment.cmt_content} ({timeAgo(comment.created_at)})
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
