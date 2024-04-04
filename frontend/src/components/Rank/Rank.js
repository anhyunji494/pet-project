import React, {useState, useEffect} from "react";
import "./Rank.css";
import axios from "axios";
import Modal from "react-modal";
import PostDetail from "../PostDetail/PostDetail";

const Rank = () => {
  const [rankedPhotos, setRankedPhotos] = useState([]);
  const [selectedPostIdx, setSelectedPostIdx] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchRankedPhotos = async () => {
      try {
        const response = await axios.get("/post/rank");
        setRankedPhotos(response.data);
      } catch (error) {
        console.error("랭킹 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchRankedPhotos();
  }, []);

  const openModal = (postIdx) => {
    setSelectedPostIdx(postIdx);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPostIdx(null);
    setModalIsOpen(false);
  };

  return (
      <div id="rank-justify">
        <div id="rank-container">
          <div id="rank-title">🔥 THIS WEEK ON TRENDS 🔥</div>
          <div id="rank-divs">
            {rankedPhotos.map((photo, index) => (
                <div id="rank-div" key={index} onClick={() => openModal(photo.post_idx)}>
                  <img src={photo.file_rname.split(",")[0]} alt={`Rank ${index + 1}`}/>
                </div>
            ))}
          </div>
          <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={{
                overlay: {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.52)",
                  backdropFilter: "blur(5px)",
                },
                content: {
                  position: "absolute",
                  top: "40px",
                  left: "40px",
                  right: "40px",
                  bottom: "40px",
                  border: "none",
                  background: "rgba(0, 0, 0, 0)",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "4px",
                  outline: "none",
                  padding: "20px",
                },
              }}
          >
            <PostDetail post_idx={selectedPostIdx}/>
            <button id="modal-close-btn" onClick={closeModal}>
              X
            </button>
          </Modal>
        </div>
      </div>
  );
};

export default Rank;
