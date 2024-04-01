import React, { useState } from 'react';
import "./Write.css";
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer';

const Write = () => {
    const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
    const REGION = process.env.REACT_APP_REGION;
    const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
    const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
    AWS.config.update({ accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_ACCESS_KEY, region: REGION });
    const s3 = new AWS.S3();

    const [postContent, setPostContent] = useState('');
    const [files, setFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);

        // 이미지 미리보기 설정
        const urls = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    const uploadImageToS3 = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(',')[1]; // Extract base64 data
                const base64Data = Buffer.from(base64, 'base64');
                const type = file.type.split('/')[1];
                const params = {
                    Bucket: S3_BUCKET,
                    Key: `${uuidv4()}.${type}`,
                    Body: base64Data,
                    ACL: 'public-read',
                    ContentEncoding: 'base64', // required
                    ContentType:type // required
                };

                s3.upload(params, (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data.Location); // 이미지 업로드 후 URL 반환
                    }
                });
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // 이미지를 S3에 업로드하고 업로드된 URL을 배열에 저장
            const imageUrls = await Promise.all(files.map(uploadImageToS3));
    
            // 서버로 데이터 전송
            const formData = new FormData();
            formData.append('post_content', postContent);
            imageUrls.forEach(url => {
                formData.append('post_file', url); // 이미지 URL을 배열에 추가
            });
    
            // fetch API를 사용하여 서버로 전송
            const response = await fetch('/posts/new', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                console.log('Post uploaded successfully');
                // 서버로부터 이미지 URL을 받아옴
                // 필요한 추가 작업 수행
            } else {
                console.error('Failed to upload post');
            }
        } catch (error) {
            console.error('Error uploading images to S3:', error);
        }
    };
    
    return (
        <>
            <div id="post-container">
                <div id="photo-div">
                    {/* 이미지 미리보기 */}
                    {previewUrls.map((url, index) => (
                        <img key={index} src={url} alt={`Preview ${index}`} id={`photo-preview-${index}`} />
                    ))}
                    <div id="photo-upload">
                        <label id="photo-upload-btn" htmlFor="input-file">
                            파일 업로드
                        </label>
                        <input type="file" id="input-file" style={{ display: "none" }} onChange={handleFileChange} multiple />
                        {/* 기존의 input file 태그 숨김 */}
                    </div>
                </div>
                <div id="txt-div">
                    <textarea id="txt-input" value={postContent} onChange={(e) => setPostContent(e.target.value)}></textarea>
                    <button id="post-upload-btn" onClick={handleSubmit}>글 작성</button>
                </div>
            </div>
        </>
    );
}

export default Write;
