import React, { useState } from "react";
import Modal from "./Modal";
import PrivacyModal from "./PrivacyModal";
import TermsModal from "./TermsModal";
import ContactModal from "./ContactModal";

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const modalConfig = {
    privacy: {
      title: "Privacy Policy",
      component: <PrivacyModal />,
      maxWidth: "max-w-4xl"
    },
    terms: {
      title: "Terms of Service",
      component: <TermsModal />,
      maxWidth: "max-w-4xl"
    },
    contact: {
      title: "Contact Us",
      component: <ContactModal />,
      maxWidth: "max-w-4xl"
    }
  };

  return (
    <>
      <footer className="bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-gray-700 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} AI Career Coach. All rights reserved.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            <button 
              onClick={() => openModal('privacy')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="hidden sm:inline">•</span>
            <button 
              onClick={() => openModal('terms')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Terms of Service
            </button>
            <span className="hidden sm:inline">•</span>
            <button 
              onClick={() => openModal('contact')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </footer>

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

export default Footer;