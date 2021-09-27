import { useState } from "react";
import { useTheme } from "../../contexts/theme-context";

export const Toast = ({ text, showToast, setShowToast }) => {
  const {
    theme: { dark, light },
    isDark,
  } = useTheme();
  setTimeout(() => setShowToast(false), 2000);
  clearTimeout();
  return (
    <>
      {showToast && (
        <p
          style={isDark ? { ...dark, zIndex: 2 } : { zIndex: 2 }}
          className="toast-container"
        >
          {text}
        </p>
      )}
    </>
  );
};
