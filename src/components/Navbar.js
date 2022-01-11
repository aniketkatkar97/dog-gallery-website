import React from "react";
import CustomSearchModal from "./CustomSearchModal";

function Navbar({ breeds }) {
  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Dog Gallery
          </a>
          <CustomSearchModal breeds={breeds} />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
