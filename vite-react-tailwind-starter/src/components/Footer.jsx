import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#121212] border-t py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
      &copy; {new Date().getFullYear()} AI Career Coach. All rights reserved.
    </footer>
  );
};

export default Footer;