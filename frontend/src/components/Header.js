import * as React from "react";
import "./Header.css"

function Header() {
  const handleSearch = () => {
    // Perform search action
    console.log("Search button clicked");
  };

  return (
    <>
      <div className="div">
        <button className="button">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cf79b0513ee9fc5c15a74aae4d2087f605c197384b09b1b8d029e5759767ba0?apiKey=90aa7ae4bb3148a18366a057ad7e2c00&" className="img" />
        </button>
        <button className="button-2">petwave</button>
        <div className="div-3">
          <button className="button-3" onClick={handleSearch}>
            <input type="text" className="search" placeholder="search" />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/16bb67922a67115abbfbcd2b87aee842925200e90213367d651b767ba1d5d096?apiKey=90aa7ae4bb3148a18366a057ad7e2c00&" className="img-3" />
          </button>
        </div>
      </div>
      </>
  )}

export default Header