import * as React from "react";
import "./Header.css";
import search from "../icons/searchicon.png"

function Header() {
  const handleSearch = () => {
    // Perform search action
    console.log("Search button clicked");
  };

  return (
    <>
      <div className="div">
        <button className="button">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cf79b0513ee9fc5c15a74aae4d2087f605c197384b09b1b8d029e5759767ba0?apiKey=90aa7ae4bb3148a18366a057ad7e2c00&"
            className="img"
          />
        </button>
        <button className="logo">petwave</button>

        <button className="apps">apps</button>

        <button className="alarm">alarm</button>

        <button className="heart">heart</button>

        <button className="talk">talk</button>

        <button className="beMyFriend">beMyFriend</button>
        
        <button className="share">share</button>

        <button className="petPaw">petPaw</button>

          <div className="search-div" onClick={handleSearch}>
            
            <fieldset className="fieldset">
            <input type="text" className="search-input" placeholder="search" />
            <i class="fi fi-rr-search"></i>
             

            </fieldset>
            
            
        </div>
      </div>
    </>
  );
}

export default Header;