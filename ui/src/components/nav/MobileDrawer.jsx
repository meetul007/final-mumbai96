"use client";

import Link from "next/link";

export default function MobileDrawer({ onClose }) {
  return (
    <>
      <div className="m96-drawer-overlay" onClick={onClose}></div>

      <div className="m96-drawer open">
        <button onClick={onClose}>Close</button>

        <Link href="/">Home</Link>
        <Link href="/know-us">About</Link>
        <Link href="/contact-us">Contact</Link>
      </div>
    </>
  );
}
