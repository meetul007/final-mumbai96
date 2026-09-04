import Link from "next/link";
import { Fragment } from "react";

export function PageHero({
  variant = "default",
  tone,
  glowVariant,
  breadcrumbs,
  kicker,
  title,
  description,
  stats,
  children,
}) {
  const heroClass = [
    variant === "services" ? "page-hero page-hero--services" : "page-hero",
    tone === "gold" ? "page-hero--gold" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const innerClass =
    variant === "services" ? "ph-inner ph-inner--services" : "ph-inner";

  return (
    <div className={heroClass}>
      <div className="ph-grid" aria-hidden />
      {glowVariant ? (
        <div className={`ph-glow ph-glow--${glowVariant}`} aria-hidden />
      ) : (
        <>
          <div className="ph-glow ph-glow--a" aria-hidden />
          <div className="ph-glow ph-glow--b" aria-hidden />
        </>
      )}
      <div className="con">
        <div className={innerClass}>
          <div className="ph-bc">
            {breadcrumbs.map((bc, idx) => (
              <Fragment key={`${bc.label}-${idx}`}>
                {idx > 0 ? <span>/</span> : null}
                {bc.href ? (
                  <Link href={bc.href}>{bc.label}</Link>
                ) : (
                  <span>{bc.label}</span>
                )}
              </Fragment>
            ))}
          </div>
          <div className="ph-kicker">{kicker}</div>
          <h1 className="ph-h1">{title}</h1>
          {description ? <p className="ph-desc">{description}</p> : null}
          {children}
        </div>
      </div>
      <div className="ph-bottom">
        <div className="con">
          <div className="ph-stats">
            {stats.map((s) => (
              <div key={s.label} className="phs">
                <div className="phs-n">{s.value}</div>
                <div className="phs-l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
