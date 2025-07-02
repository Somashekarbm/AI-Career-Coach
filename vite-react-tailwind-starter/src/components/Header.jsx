import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Target } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import sessionService from "../services/sessionService";
import MenuDropdown from "./MenuDropdown";
import Modal from "./Modal";
import AboutModal from "./AboutModal";
import ContactModal from "./ContactModal";
import PrivacyModal from "./PrivacyModal";
import TermsModal from "./TermsModal";
import axios from "axios";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const isLoggedIn = sessionService.isLoggedIn();
  const [avatar, setAvatar] = useState(null);
  const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const fetchAvatar = async () => {
      if (isLoggedIn && userId) {
        try {
          const res = await axios.get(`http://localhost:8080/api/v1/users/${userId}/profile`);
          setAvatar(res.data.avatar || "/image/male1.png");
        } catch {
          setAvatar("/image/male1.png");
        }
      }
    };
    fetchAvatar();
  }, [isLoggedIn, userId]);

  const openModal = (modalType) => {
    setActiveModal(modalType);
    setIsMobileMenuOpen(false);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const modalConfig = {
    about: {
      title: "About GoalForge AI",
      component: <AboutModal />,
      maxWidth: "max-w-4xl"
    },
    privacy: {
      title: "Privacy Policy",
      component: <PrivacyModal />,
      maxWidth: "max-w-4xl"
    },
    terms: {
      title: "Terms of Service",
      component: <TermsModal />,
      maxWidth: "max-w-4xl"
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-white/20 dark:border-gray-700/50">
        <div className="max-w-8xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Target size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              GoalForge AI
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-6 items-center text-gray-800 dark:text-white">
            {isLoggedIn && (
              
              <button 
                onClick={() => navigate("/goal-set")} 
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50"
              >
                Goals
              </button>
            )}

            {/* Menu Dropdown - Only show when logged in */}
            {isLoggedIn && (
              <>
                {avatar && (
                  <img
                    src={avatar.startsWith("/image/") || avatar.startsWith("http") ? avatar : `/image/${avatar}.png`}
                    alt="avatar"
                    className="hidden sm:inline w-10 h-10 rounded-full border-2 border-indigo-500 shadow-md mr-2 transition-all duration-200 bg-white object-cover"
                    style={{ marginRight: 8 }}
                  />
                )}
                <MenuDropdown />
              </>
            )}

            {!isLoggedIn && (
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-4 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-white/20 dark:border-gray-700/50 animate-slide-down">
            <div className="px-6 py-4 space-y-3">
              {isLoggedIn && (
                <button 
                  onClick={() => navigate("/goal-set")} 
                  className="block w-full text-left py-3 px-4 text-gray-800 dark:text-white hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                >
                  Goals
                </button>
              )}

              {/* Mobile Menu Dropdown - Only show when logged in */}
              {isLoggedIn && (
                <div className="pt-2">
                  <MenuDropdown />
                </div>
              )}

              {!isLoggedIn && (
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full text-left py-3 px-4 text-gray-800 dark:text-white hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      {activeModal && modalConfig[activeModal] && (
        <Modal
          isOpen={!!activeModal}
          onClose={closeModal}
          title={modalConfig[activeModal].title}
          maxWidth={modalConfig[activeModal].maxWidth}
        >
          {modalConfig[activeModal].component}
        </Modal>
      )}
    </>
  );
};

export default Header;
