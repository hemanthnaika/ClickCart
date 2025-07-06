import React, { useState } from "react";
import AuthModal from "../components/AuthModal";

export default function LoginModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
      >
        Login
      </button>
      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
