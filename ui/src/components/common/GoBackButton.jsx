"use client";

export default function GoBackButton({ children, ...props }) {
  return (
    <button onClick={() => window.history.back()} {...props}>
      {children || "← Go Back"}
    </button>
  );
}
