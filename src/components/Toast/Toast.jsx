import { useState } from "react";

export const Toast = ({ text, showToast, setShowToast }) => {
  setTimeout(() => setShowToast(false), 2000);
  clearTimeout();
  return (
    <>
      {showToast && (
        <p style={{ zIndex: 2 }} className="toast-container">
          {text}
        </p>
      )}
    </>
  );
};
