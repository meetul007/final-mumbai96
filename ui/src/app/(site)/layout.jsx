import Footer from "@/components/Footer";
import Navbar from "@/components/nav/Navbar";

export default function SiteLayout({ children }) {
  return (
    <>
      {/* <Navbar /> */}
      <div className="content-wrapper">{children}</div>
      {/* <Footer /> */}
    </>
  );
}
