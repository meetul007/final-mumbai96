import ScrollReveal from "@/components/common/ScrollReveal";
import LocalTrainsClient from "./LocalTrainsClient";

export const metadata = {
  title:
    "Mumbai Local Train Guide 2026 — Western, Central & Harbour Line Map | Mumbai96",
  description:
    "Mumbai Local Train complete guide 2026. Interactive map of Western Line (Churchgate–Virar), Central Line (CSMT–Kasara), and Harbour Line (CSMT–Panvel). Fares, timings, tips & stations for every Mumbaikar.",
  keywords:
    "mumbai local train guide 2026, western railway churchgate virar stations, central railway CSMT kasara stations, harbour line CSMT panvel, mumbai local train map, mumbai local train fare 2026, mumbai local train timings, mumbai suburban railway guide, mumbai train stations list, dadar interchange",
  alternates: {
    canonical: "https://mumbai96.vercel.app/mumbai-local-trains",
  },
  openGraph: {
    title:
      "Mumbai Local Train Guide 2026 — Western, Central & Harbour Line Interactive Map | Mumbai96",
    description:
      "Interactive map and complete guide to Mumbai's 3 local train lines — Western Line, Central Line & Harbour Line. Fares, timings, station tips and the Dadar interchange explained simply.",
    url: "https://mumbai96.vercel.app/mumbai-local-trains",
    type: "article",
    siteName: "Mumbai96",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mumbai Local Train Guide 2026 — Interactive Map | Mumbai96",
    description:
      "Click any station on our interactive Mumbai local train map. Western, Central & Harbour lines explained simply.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Mumbai Local Train Guide 2026 — Western, Central & Harbour Line Map",
      url: "https://mumbai96.vercel.app/mumbai-local-trains",
      description:
        "Complete guide to Mumbai's suburban local train network: Western Line, Central Line and Harbour Line with interactive map, fares, timings and commuter tips.",
      publisher: {
        "@type": "Organization",
        name: "Mumbai96",
        url: "https://mumbai96.vercel.app",
      },
      dateModified: "2026-04-01",
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
            name: "Mumbai Local Train Guide 2026",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many local train lines are there in Mumbai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mumbai has 3 suburban local train lines: Western Line (Churchgate to Virar, 60+ km), Central Line (CSMT to Kasara/Khopoli, 120+ km), and Harbour Line (CSMT to Panvel, 54+ km). Together they carry over 7.5 million passengers daily.",
          },
        },
        {
          "@type": "Question",
          name: "What time does the first local train run in Mumbai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The first Mumbai local trains run as early as 4:13 AM from CSMT (Central Line), 4:25 AM from CSMT on the Harbour Line, and 4:33 AM from Churchgate on Western Line. Trains run until approximately 1:00–1:30 AM (last trains).",
          },
        },
        {
          "@type": "Question",
          name: "What is the fare for Mumbai local train?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mumbai local train second class fares start at ₹5 for very short distances and go up to approximately ₹60–₹70 for the longest journeys (Churchgate to Virar or CSMT to Kasara). First class costs approximately 4 times the second class fare. Monthly season tickets (MST) offer the best value for daily commuters.",
          },
        },
        {
          "@type": "Question",
          name: "Which is the busiest station on Mumbai local train?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CSMT (Chhatrapati Shivaji Maharaj Terminus) and Dadar are the busiest stations. Dadar is the only station in Mumbai where Western Line and Central Line trains interchange within walking distance, making it extremely crowded during peak hours. Andheri is the busiest on Western Line.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between Fast and Slow local trains in Mumbai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fast trains skip smaller intermediate stations and are significantly quicker — they cover Churchgate to Virar in about 72 minutes versus 100+ minutes for slow trains. Slow trains stop at every station. Check that your destination station is on the Fast train halt list before boarding. The UTS app and Mumbai Rail Map app show which trains stop at each station.",
          },
        },
        {
          "@type": "Question",
          name: "What is Dadar interchange on Mumbai local trains?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dadar has two separate stations — Dadar WR (Western Line) and Dadar CR (Central Line) — approximately 10–12 minutes walk apart. It is the key interchange point between the Western and Central lines, located at the geographic centre of Mumbai. Many commuters switch lines at Dadar to avoid travelling all the way to CSMT or Churchgate.",
          },
        },
        {
          "@type": "Question",
          name: "How do I buy a Mumbai local train ticket?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can buy Mumbai local train tickets at any suburban railway booking counter (at major stations), from ATVM (Automatic Ticket Vending Machines) at platforms, or through the UTS (Unreserved Ticketing System) mobile app available on Play Store and App Store. Monthly Season Tickets (MST) are best for daily commuters and can be renewed at counters or via UTS app.",
          },
        },
        {
          "@type": "Question",
          name: "Which is the last station on Harbour Line?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Panvel is the last station on the Harbour Line. The Harbour Line runs from CSMT in South Mumbai to Panvel in Navi Mumbai, covering 54+ km with major stops at Wadala, Chembur, Vashi, Belapur and Panvel. It takes approximately 65–70 minutes from CSMT to Panvel.",
          },
        },
        {
          "@type": "Question",
          name: "What are Ladies compartments on Mumbai local trains?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mumbai local trains reserve specific compartments exclusively for women. On Western Line, the first and last coaches are Ladies compartments. On Central Line, the first coach from the front is Ladies. During peak hours (8–10 AM and 6–9 PM), general compartments also have a designated ladies section. Men are not allowed in ladies compartments.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use UPI to buy Mumbai local train tickets?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The UTS (Unreserved Ticketing System) app accepts UPI, debit cards, credit cards and net banking for purchasing Mumbai local train tickets on your phone. You can buy single journey tickets and monthly/quarterly season passes. However, you must be within a specific radius of the station when purchasing a ticket through the app.",
          },
        },
      ],
    },
  ],
};

export default function MumbaiLocalTrainsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollReveal>
        <LocalTrainsClient />
      </ScrollReveal>
    </>
  );
}
