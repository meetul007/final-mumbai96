import Link from "next/link";

export const metadata = {
  title: "Coming Soon — Mumbai96",
  description: "This page is under development. Check back soon for new Mumbai96 content.",
};

export default function ComingSoon() {
  return (
    <div className="coming-soon-page" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'60vh',textAlign:'center',padding:'60px 20px'}}>
      <div style={{fontSize:'4rem',marginBottom:'16px'}}>🚧</div>
      <h1 style={{fontSize:'2rem',fontWeight:'800',margin:'0 0 8px',color:'var(--ink)'}}>Coming Soon</h1>
      <p style={{color:'var(--muted)',maxWidth:'440px',lineHeight:'1.7',marginBottom:'32px'}}>We&apos;re building something new for Mumbai. This page is under development and will be available soon.</p>
      <Link href="/" style={{padding:'12px 28px',borderRadius:'100px',background:'var(--red, #ff6b00)',color:'#fff',fontWeight:'700',textDecoration:'none',fontSize:'14px'}}>Back to Home</Link>
    </div>
  );
}
