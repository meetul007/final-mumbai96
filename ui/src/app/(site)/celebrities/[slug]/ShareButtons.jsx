"use client";

export function ShareButtons({ fullName }) {
  return (
    <div className="celeb-share-strip">
      <button
        className="celeb-share-btn"
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: `${fullName} | Mumbai96`,
              url: window.location.href,
            });
          } else {
            navigator.clipboard.writeText(window.location.href);
          }
        }}
      >
        🔗 Share
      </button>
      {/* <button className="celeb-share-btn">🔖 Save</button> */}
    </div>
  );
}
