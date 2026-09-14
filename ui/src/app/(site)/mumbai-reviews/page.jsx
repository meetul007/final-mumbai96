import Link from "next/link";
import ReviewsClient from "./ReviewsClient";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const metadata = {
  title: "Mumbai Reviews — Mumbai96",
  description: "Real reviews from real Mumbaikars — builders, brokers, contractors, doctors, service providers and more. Read before you deal. Write to help others.",
};

export default async function Page() {
  // TEMP: client wants this page showing "Coming Soon" for now — real
  // reviews data isn't ready yet. The original page content below is
  // untouched, just unreachable while this flag is true. Flip to false
  // to restore it once real data is ready.
  const SHOW_COMING_SOON = true;
  if (SHOW_COMING_SOON) {
    return (
      <div className="coming-soon-page" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'60vh',textAlign:'center',padding:'60px 20px'}}>
        <div style={{fontSize:'4rem',marginBottom:'16px'}}>🚧</div>
        <h1 style={{fontSize:'2rem',fontWeight:'800',margin:'0 0 8px',color:'var(--ink)'}}>Coming Soon</h1>
        <p style={{color:'var(--muted)',maxWidth:'440px',lineHeight:'1.7',marginBottom:'32px'}}>We&apos;re building something new for Mumbai. This page is under development and will be available soon.</p>
        <Link href="/" style={{padding:'12px 28px',borderRadius:'100px',background:'var(--red, #ff6b00)',color:'#fff',fontWeight:'700',textDecoration:'none',fontSize:'14px'}}>Back to Home</Link>
      </div>
    );
  }

  let initialReviews = [];

  try {
    const res = await fetch(`${API}/api/public/reviews?per_page=100&sort=newest`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      initialReviews = (data.reviews || []).map(r => ({
        ...r,
        id: r.id || 'api-' + r.id,
        date: r.created_at ? r.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
        helpful: r.helpful_count || 0,
      }));
    }
  } catch (e) {}

  return <ReviewsClient initialReviews={initialReviews} />;
}
