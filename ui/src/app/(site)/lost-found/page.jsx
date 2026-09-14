import Link from "next/link";
import LostFoundClient from "./LostFoundClient";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const metadata = {
  title: "Mumbai Lost & Found — Mumbai96",
  description: "Free community lost and found board for Mumbaikars. Post lost items, report found belongings, and help reunite Mumbai's community.",
};

export default async function Page() {
  // TEMP: client wants this page showing "Coming Soon" for now — real
  // lost & found data isn't ready yet. The original page content below
  // is untouched, just unreachable while this flag is true. Flip to
  // false to restore it once real data is ready.
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

  let initialListings = [];
  try {
    const res = await fetch(`${API}/api/public/lost-found?per_page=50`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      initialListings = data.listings || [];
    }
  } catch (e) {}

  return <LostFoundClient initialListings={initialListings} />;
}
