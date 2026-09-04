"use client";

import { waLink } from "@/lib/whatsapp";

export default function ContactBox({ businessName, phone }) {
  if (!phone) return null;

  return (
    <div className="contact-box" id="contactBox">
      <div className="cb-top">
        <h4>Contact {businessName}</h4>
      </div>

      <div className="dir-btns">
        <a
          href={waLink(phone)}
          className="dir-btn wa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="dir-ico">💬</span>
          <div>
            <div>WhatsApp</div>
            <span className="dir-sub">Quick reply · Open 10am–7pm</span>
          </div>
        </a>
        <a href={`tel:${phone}`} className="dir-btn">
          <span className="dir-ico">📞</span>
          <div>
            <div>{phone}</div>
            <span className="dir-sub">Call directly</span>
          </div>
        </a>
      </div>
    </div>
  );
}
