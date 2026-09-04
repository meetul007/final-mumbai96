import ScrollReveal from "@/components/common/ScrollReveal";
import MetroGuideClient from "./MetroGuideClient";

export const metadata = {
  title:
    "Mumbai Metro Guide 2026 — All Lines, Interactive Map, Fares & Stations | Mumbai96",
  description:
    "Complete Mumbai Metro guide 2026. Interactive map of all operational lines — Line 1 Blue, Line 2A Yellow, Line 3 Aqua (underground), Line 7 Red, Line 9 & Line 2B (new April 2026). Station list, fares, timings and interchange guide.",
  keywords:
    "mumbai metro guide 2026, mumbai metro map 2026, mumbai metro line 3 aqua line, mumbai metro line 1 versova ghatkopar, mumbai metro line 2a dahisar, mumbai metro line 7 red line, mumbai metro new lines 2026, mumbai metro fares, mumbai metro stations list, mumbai metro interchange, BKC metro, cuffe parade metro, marol naka interchange",
  alternates: {
    canonical: "https://mumbai96.vercel.app/mumbai-metro",
  },
  openGraph: {
    title:
      "Mumbai Metro Guide 2026 — Interactive Map, All Lines, Fares & Stations | Mumbai96",
    description:
      "Interactive Mumbai Metro map 2026 — click any station to explore. Lines 1, 2A, 3 (Aqua), 7, and new Lines 9 & 2B. Complete fares, timings and commuter guide.",
    url: "https://mumbai96.vercel.app/mumbai-metro",
    type: "article",
    siteName: "Mumbai96",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mumbai Metro 2026 — Interactive Map | Mumbai96",
    description:
      "Click any station on our Mumbai Metro map. All 6 operational lines explained simply — for every Mumbaikar.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Mumbai Metro Guide 2026 — All Lines, Interactive Map, Fares & Stations",
      url: "https://mumbai96.vercel.app/mumbai-metro",
      description:
        "Complete guide to Mumbai Metro network 2026: all operational lines, interactive station map, fares, timings and interchange guide.",
      publisher: {
        "@type": "Organization",
        name: "Mumbai96",
        url: "https://mumbai96.vercel.app",
      },
      dateModified: "2026-04-16",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://mumbai96.vercel.app",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Mumbai Transport",
            item: "https://mumbai96.vercel.app/transport",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Mumbai Metro Guide 2026",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many metro lines are operational in Mumbai in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "As of April 2026, Mumbai has 6 operational metro lines: Line 1 Blue (Versova–Ghatkopar, 11.4 km), Line 2A Yellow (Dahisar–DN Nagar, 18.6 km), Line 3 Aqua (Aarey–Cuffe Parade, 33.5 km, fully underground), Line 7 Red (Dahisar East–Gundavali, 16.5 km), Line 9 partial (new April 2026, Dahisar East extension toward Mira-Bhayandar), and Line 2B partial (new April 2026, Diamond Garden–Mandale). The total operational network is 101.43 km as of April 2026.",
          },
        },
        {
          "@type": "Question",
          name: "Which Mumbai Metro line goes to the airport?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mumbai Metro Line 3 (Aqua Line) connects directly to Chhatrapati Shivaji Maharaj International Airport — it has stations at both Terminal 1 (T1) and Terminal 2 (T2). It is the fastest and most reliable way to reach the airport from BKC, Andheri, Marol, or CSMT. Line 7A (under construction, expected 2026) will also connect to T2.",
          },
        },
        {
          "@type": "Question",
          name: "What is the Mumbai Metro Line 3 Aqua Line?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mumbai Metro Line 3, called the Aqua Line, is Mumbai's first fully underground metro. It runs 33.5 km with 27 stations from Aarey JVLR in the north to Cuffe Parade in South Mumbai. It became fully operational on October 8, 2025. Key stations include Marol Naka (Line 1 interchange), Airport T1 & T2, BKC, Dadar, Worli, Churchgate, CSMT, and Cuffe Parade. Operated by MMRCL (Mumbai Metro Rail Corporation Limited).",
          },
        },
        {
          "@type": "Question",
          name: "Where do Mumbai Metro Line 1 and Line 3 interchange?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mumbai Metro Line 1 (Blue Line) and Line 3 (Aqua Line) interchange at Marol Naka station. This is a key hub that connects the east-west Line 1 corridor (Versova to Ghatkopar) with the north-south underground Line 3 (Aarey to Cuffe Parade).",
          },
        },
        {
          "@type": "Question",
          name: "What is the Mumbai Metro fare range in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mumbai Metro fares start at ₹10 for short distances. Line 1 fares range from ₹10 to ₹40. Line 2A and Line 7 fares are ₹10 to ₹50. Line 3 Aqua Line fares range from ₹10 to ₹80 depending on distance. Smart card holders get a 10% discount on all journeys. Tokens are available at stations; QR code tickets can be booked via the Mumbai 1 app, Paytm, or PhonePe.",
          },
        },
        {
          "@type": "Question",
          name: "What is the Mumbai Metro smart card and how does it work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Mumbai Metro Smart Card (available at any metro station counter for ₹50 refundable deposit) works across all metro lines and gives 10% discount on every journey. It can be topped up at station kiosks, customer service counters, or online via the Mumbai 1 app. The card stores a prepaid balance and is tapped at entry and exit gates.",
          },
        },
        {
          "@type": "Question",
          name: "What are the new Mumbai Metro lines opened in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On April 7, 2026, two new metro sections were inaugurated by CM Devendra Fadnavis: Line 9 Phase 1 (Dahisar East to Kashigaon, extending Line 7 northward into the Mira-Bhayandar region) and Line 2B Phase 1 (Mandale to Diamond Garden in Chembur, the eastern section of the Yellow Line). These are the first metro lines to enter Mira-Bhayandar and the Chembur-Harbour Line zone.",
          },
        },
        {
          "@type": "Question",
          name: "What time does Mumbai Metro first and last train run?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mumbai Metro Line 1 first train is at 5:30 AM from Versova and Ghatkopar. Line 2A and Line 7 first trains are at 6:00 AM. Line 3 Aqua Line first train is at 6:00 AM from both Aarey and Cuffe Parade ends. Last trains on most lines run until 11:00 PM. Line 3 last train is approximately 11:00–11:30 PM. Always check the Mumbai 1 app or MMRCL website for latest timings.",
          },
        },
        {
          "@type": "Question",
          name: "How do I buy a Mumbai Metro ticket?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mumbai Metro tickets can be bought as: (1) Tokens from the ticket vending machines at any station, (2) QR code tickets via the Mumbai 1 app (works offline once downloaded), (3) UPI payment via Paytm or PhonePe at vending machines, (4) Smart card top-up at service counters. Smart cards are recommended for regular users — they give 10% discount and allow faster entry through the fare gates.",
          },
        },
        {
          "@type": "Question",
          name: "Which Mumbai Metro lines are under construction in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Several lines are under construction in 2026: Line 4 Green (Bhakti Park Wadala to Kasarvadavali via Thane, 32.32 km — phased opening expected in 2026), Line 6 Pink (JVLR corridor Lokhandwala to Kanjurmarg, 14.47 km — mid-2026), Line 5 Orange (Thane to Kalyan via Bhiwandi, 23.5 km), and Line 7A (Airport T2 extension, 3.17 km — end 2026).",
          },
        },
      ],
    },
  ],
};

export default function MumbaiMetroPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollReveal>
        <MetroGuideClient />
      </ScrollReveal>
    </>
  );
}
