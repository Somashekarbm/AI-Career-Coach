import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} AI Career Coach. All rights reserved.
    </footer>
  );
};

export default Footer;
