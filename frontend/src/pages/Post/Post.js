import React, { useState } from 'react';
import axios from 'axios';

function Posts() {
    const [post_content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // FormData 객체 생성
            const formData = new FormData();
            formData.append('post_content', post_content);
            formData.append('file_rname', image);

            // 게시물 추가 요청
            const response = await axios.post('/posts/new', formData);
            console.log(response.data);
            // 게시물 추가 완료 후 처리 (예: 홈 화면으로 이동)
        } catch (error) {
            console.error('게시물 추가 중 오류 발생:', error);
        }
    };

    return (
        <div>
            <h2>게시글 작성</h2>
            <form action="/posts/new" method="POST" /*onSubmit={handleSubmit} */encType="multipart/form-data">
                <div>
                    <label htmlFor="content">내용:</label>
                    <textarea
                        name="post_content"
                        // value={post_content}
                        // onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="image">이미지 업로드:</label>
                    <input
                        type="file"
                        name="post_file"
                        accept="image/*"
                        multiple
                        // onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit">게시물 추가</button>
            </form>
        </div>
    );
}

export default Posts;
