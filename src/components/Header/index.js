import React from "react";
import { brandIcon } from "../../assets/images";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <img src={brandIcon} alt="HappyFace" width="40" height="40" />
      <p className="heading">Monk Upsell & Cross-sell</p>
    </div>
  );
}

export default Header;
