import Script from 'next/script'
  import { Geist, Geist_Mono } from "next/font/google";
import "./styles.combined.css";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/context/toast/toast-provider";
import { AuthProvider } from "@/context/auth/AuthContext";
import GlobalLoader from "@/components/common/GlobalLoader";
import SplashGate from "@/components/common/SplashGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mumbai 96",
  description: "Boost Traffic With Mumbai96 Today !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
            <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-57S2SGL3');`}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Sora:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
                  <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-57S2SGL3"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}>
        </iframe>
      </noscript>
        <SplashGate />
        <AuthProvider>
          <Navbar />
          <ToastProvider>
            <div className="main-content">{children}</div>
          </ToastProvider>
          <GlobalLoader />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
