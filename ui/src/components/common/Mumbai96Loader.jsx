'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './Mumbai96Loader.module.css';

export default function Mumbai96Loader({ onComplete, duration = 3500 }) {
  const loaderRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const bombayRef = useRef(null);
  const mumbaiRef = useRef(null);
  const dividerRef = useRef(null);
  const yearRef = useRef(null);
  const finalRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const set = (el, props) => {
      if (!el) return;
      Object.assign(el.style, props);
    };

    if (prefersReduced) {
      set(finalRef.current, { opacity: '1' });
      set(logoRef.current, { opacity: '1', transform: 'scale(1)' });
      set(leftRef.current, { display: 'none' });
      set(rightRef.current, { display: 'none' });
      set(dividerRef.current, { display: 'none' });
      set(yearRef.current, { display: 'none' });
      const t = setTimeout(() => {
        set(loaderRef.current, { display: 'none' });
        onComplete?.();
      }, 1500);
      return () => clearTimeout(t);
    }

    const timers = [];
    const T = (fn, ms) => timers.push(setTimeout(fn, ms));

    // Beat 1 — BOMBAY fades in
    T(() => set(bombayRef.current, { transition: 'opacity 0.3s ease', opacity: '1' }), 80);

    // Beat 2 — MUMBAI fades in
    T(() => set(mumbaiRef.current, { transition: 'opacity 0.3s ease', opacity: '1' }), 220);

    // Beat 3 — 1996 appears
    T(() => set(yearRef.current, {
      transition: 'opacity 0.25s ease, transform 0.3s ease',
      opacity: '1',
      transform: 'translate(-50%, -50%) scale(1)',
    }), 520);

    // Beat 4 — panels squeeze
    T(() => {
      set(leftRef.current, { transition: 'width 0.38s ease', width: '42%' });
      set(rightRef.current, { transition: 'width 0.38s ease', width: '42%' });
      set(yearRef.current, {
        transition: 'transform 0.38s ease',
        transform: 'translate(-50%, -50%) scale(1.18)',
      });
    }, 860);

    // Beat 5 — collapse
    T(() => {
      set(leftRef.current, {
        transition: 'width 0.32s ease, opacity 0.32s ease',
        width: '0%', opacity: '0',
      });
      set(rightRef.current, {
        transition: 'width 0.32s ease, opacity 0.32s ease',
        width: '0%', opacity: '0',
      });
      set(dividerRef.current, { transition: 'opacity 0.32s ease', opacity: '0' });
      set(yearRef.current, {
        transition: 'opacity 0.32s ease, transform 0.32s ease',
        opacity: '0',
        transform: 'translate(-50%, -50%) scale(1.4)',
      });
    }, 1340);

    // Beat 6 — final screen
    T(() => set(finalRef.current, { transition: 'opacity 0.28s ease', opacity: '1' }), 1620);

    // Beat 7 — logo
    T(() => set(logoRef.current, {
      transition: 'opacity 0.4s ease, transform 0.4s ease',
      opacity: '1', transform: 'scale(1)',
    }), 1700);

    // Auto-dismiss
    T(() => {
      set(loaderRef.current, { transition: 'opacity 0.5s ease', opacity: '0' });
      setTimeout(() => {
        set(loaderRef.current, { display: 'none' });
        onComplete?.();
      }, 500);
    }, duration);

    return () => timers.forEach(clearTimeout);
  }, [duration, onComplete]);

  return (
    <div
      ref={loaderRef}
      aria-hidden="true"
      className={styles.loader}
    >
      {/* Left panel — BOMBAY */}
      <div ref={leftRef} className={styles.leftPanel}>
        <div className={styles.skyline}>
          {[14,0,28,0,18,0,40,0,24,0,12].map((h, i) => (
            <div key={i} className={styles.skyBlock} style={{ width: `${[5,2,4,2,7,2,3,2,5,3,8][i]}%`, height: `${h}px` }} />
          ))}
        </div>
        <div ref={bombayRef} className={styles.bombay}>BOMBAY</div>
      </div>

      {/* Right panel — MUMBAI */}
      <div ref={rightRef} className={styles.rightPanel}>
        <div className={`${styles.skyline} ${styles.skylineFlip}`}>
          {[20,0,36,0,48,0,16,0,30,0,14].map((h, i) => (
            <div key={i} className={styles.skyBlock} style={{ width: `${[6,2,4,2,3,2,7,2,5,3,8][i]}%`, height: `${h}px` }} />
          ))}
        </div>
        <div ref={mumbaiRef} className={styles.mumbai}>MUMBAI</div>
      </div>

      {/* Divider */}
      <div ref={dividerRef} className={styles.divider} />

      {/* Year bridge */}
      <div ref={yearRef} className={styles.yearBridge}>1996</div>

      {/* Final logo screen */}
      <div ref={finalRef} className={styles.finalScreen}>
        <Image
          ref={logoRef}
          src="/logo.svg"
          alt="Mumbai96 — Everything Mumbai"
          width={460}
          height={60}
          priority
          className={styles.logo}
        />
      </div>
    </div>
  );
}
