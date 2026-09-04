import Link from "next/link";
import "./style.css";

export default function Pagination({ currentPage, totalPages, baseUrl }) {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {/* Prev */}
      {currentPage > 1 && (
        <Link href={`${baseUrl}?page=${currentPage - 1}`} className="pg-btn">
          ← Prev
        </Link>
      )}

      {/* Numbers */}
      {pages.map((p) => (
        <Link
          key={p}
          href={`${baseUrl}?page=${p}`}
          className={`pg-num ${p === currentPage ? "on" : ""}`}
        >
          {p}
        </Link>
      ))}

      {/* Next */}
      {currentPage < totalPages && (
        <Link href={`${baseUrl}?page=${currentPage + 1}`} className="pg-btn">
          Next →
        </Link>
      )}
    </div>
  );
}
