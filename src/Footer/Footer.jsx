import React from "react";
import "./Footer.style.css";

function Footer() {
  const date = new Date().getFullYear();
  return (
    <div className="bg-secondary text-center py-3">
      <h4>© Alamgir Akash (EEE-18, BUET), {date} </h4>
    </div>
  );
}

export default Footer;
