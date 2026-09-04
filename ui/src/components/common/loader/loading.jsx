export default function Loading() {
  return (
    <div className="m96-loader">
      <div className="m96-loader-inner">
        <div className="m96-shimmer title" />
        <div className="m96-shimmer line" />
        <div className="m96-shimmer line short" />

        <div className="m96-card-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="m96-card-skeleton">
              <div className="m96-shimmer img" />
              <div className="m96-shimmer line" />
              <div className="m96-shimmer line short" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
