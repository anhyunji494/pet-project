const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

AWS.config.update({ accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_ACCESS_KEY, region: REGION });
const s3 = new AWS.S3();

const uploadFileToS3 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(',')[1]; // base64 데이터 추출
            const binary = atob(base64); // base64를 이진 문자열로 디코딩
            const length = binary.length;
            const buffer = new Uint8Array(length); // 버퍼 생성
            for (let i = 0; i < length; i++) {
                buffer[i] = binary.charCodeAt(i);
            }

            const type = file.type.split('/')[1];
            const params = {
                Bucket: S3_BUCKET,
                Key: `${uuidv4()}.${type}`,
                Body: buffer,
                ACL: 'public-read',
                ContentType: file.type // 필수
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

module.exports = uploadFileToS3;
