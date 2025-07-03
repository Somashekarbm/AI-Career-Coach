// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const Hero = () => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));

//   // Listen for token changes
//   useEffect(() => {
//     const checkLoginStatus = () => {
//       setIsLoggedIn(!!Cookies.get("token"));
//     };
 
//     // Check on mount
//     checkLoginStatus();

//     // Listen for storage events (when token is set/removed in other tabs)
//     const handleStorageChange = () => {
//       checkLoginStatus();
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     // Also check periodically for immediate changes
//     const interval = setInterval(checkLoginStatus, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   const handleClick = () => {
//     if (isLoggedIn) {
//       navigate("/goal-set");
//     } else {
//       navigate("/register");
//     }
//   };

//   return (
//     <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black text-gray-900 dark:text-white min-h-screen flex items-center">
//       <div className="max-w-7xl mx-auto text-center w-full">
//         <h1 className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-white/80 font-inter mb-4 sm:mb-6">
//           AI-powered tools to launch and elevate your career
//         </h1>
        
//         <p className="whitespace-nowrap text-center font-bold leading-tight">
//   <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white">
//     Reach your{" "}
//   </span>
//   <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-purple-600 font-extrabold">
//     Dream Goal
//   </span>
//   <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white">
//     {" "}with confidence
//   </span>
// </p>



//         <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
//           <button
//             onClick={handleClick}
//             className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3 text-base sm:text-lg font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//           >
//             {isLoggedIn ? "Create Goal" : "Get Started"}
//           </button>

//           <a
//             href="#"
//             className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base sm:text-lg font-bold text-gray-900 dark:text-white border-2 border-gray-400 rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:scale-105"
//           >
//             <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 18 18" fill="none" stroke="currentColor">
//               <path d="M8.18 13.43C6.86 14.39 5 13.45 5 11.81V5.44C5 3.80 6.86 2.86 8.18 3.82L12.54 7.01C13.63 7.81 13.63 9.44 12.54 10.24L8.18 13.43Z"
//                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//             Watch Demo
//           </a>
//         </div>

//         <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-700 dark:text-white/80 px-4 sm:px-0">
//           Designed for students, job seekers, and working professionals.
//         </p>

//         <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 px-2 sm:px-4 lg:px-8">
//           <img
//             className="mx-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full transform scale-105 hover:scale-110 transition-transform duration-500"
//             src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/2/illustration.png"
//             alt="Illustration"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Hero = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));

  // Listen for token changes
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!Cookies.get("token"));
    };

    // Check on mount
    checkLoginStatus();

    // Listen for storage events (when token is set/removed in other tabs)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically for immediate changes
    const interval = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/goal-set");
    } else {
      navigate("/register");
    }
  };

  return (
    <section className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col bg-white dark:bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
  {/* Overlay for contrast */}
  <div className="absolute inset-0 bg-black dark:opacity-20 opacity-5"></div>

  <div className="relative max-w-7xl mx-auto text-center w-full z-10">
    <h1 className="text-sm sm:text-base md:text-lg text-black dark:text-white/80 font-inter mb-2 sm:mb-6">
      AI-powered tools to launch and elevate your career
    </h1>

    <p className="whitespace-nowrap text-center font-bold leading-tight">
      <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black dark:text-white">
        Reach your{" "}
      </span>
      <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold">
        Dream Goal
      </span>
      <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black dark:text-white">
        {" "}with confidence
      </span>
    </p>

    <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
      <button
        onClick={handleClick}
        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base sm:text-lg font-bold text-black dark:text-white border-2 border-gray-400 rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:scale-105"
      >
        {isLoggedIn && (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
          </svg>
        )}
        {isLoggedIn ? "Create Goal" : "Get Started"}
      </button>

      <a
        href="#"
        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base sm:text-lg font-bold text-black dark:text-white border-2 border-gray-400 rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:scale-105"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 18 18" fill="none" stroke="currentColor">
          <path d="M8.18 13.43C6.86 14.39 5 13.45 5 11.81V5.44C5 3.80 6.86 2.86 8.18 3.82L12.54 7.01C13.63 7.81 13.63 9.44 12.54 10.24L8.18 13.43Z"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Watch Demo
      </a>
    </div>

    <p className="mt-4 sm:mt-6 text-sm sm:text-base text-black dark:text-white/80 px-4 sm:px-0">
      Designed for students, job seekers, and working professionals.
    </p>

    <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 px-2 sm:px-4 lg:px-8">
      <img
        className="mx-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full transform scale-105 hover:scale-110 transition-transform duration-500"
        src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/2/illustration.png"
        alt="Illustration"
      />
    </div>
  </div>
</section>
  );
};

export default Hero;


