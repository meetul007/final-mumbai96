"use client";

export default function SendMessageButton() {
  const handleClick = (e) => {
    e.preventDefault();
    const box = document.getElementById("contactBox");
    if (box) {
      box.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(() => {
      window.dispatchEvent(new Event("m96:focus-contact"));
    }, 450);
  };

  return (
    <button className="btn-msg" onClick={handleClick}>
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      Send Message
    </button>
  );
}
