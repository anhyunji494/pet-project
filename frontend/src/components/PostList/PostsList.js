import React, { useEffect, useState } from "react";
import axios from "axios";

const PostsList = () => {
  const [postsList, setPostsList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPostsList = async () => {
      try {
        const res = await axios.get("/posts/all");
        console.log(res.data); // res 데이터를 콘솔에 출력
        setPostsList(res.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getPostsList();
  }, []);

  return (
    <div>
      <div className="body">
        {error && <div>Error: {error}</div>}
        <ul className="post-div">
          {postsList.length > 0 &&
            postsList.map((post) => (
              <li key={post.post_idx}>{post.Post_content}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PostsList;
