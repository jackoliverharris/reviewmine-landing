import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import MixpanelInit from "@/components/MixpanelInit";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reviewmine.ai"),
  title: "ReviewMine — Turn guest reviews into booking gold",
  description:
    "Extract testimonials, map objections, track guide performance — all from reviews you've already collected. Marketing intelligence for tour operators.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "ReviewMine — Turn guest reviews into booking gold",
    description:
      "Extract testimonials, map objections, track guide performance — all from reviews you've already collected.",
    url: "https://reviewmine.ai",
    siteName: "ReviewMine",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ReviewMine hero preview showing live review intelligence for tour operators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReviewMine — Turn guest reviews into booking gold",
    description:
      "Extract testimonials, map objections, track guide performance — all from reviews you've already collected.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                if (stored === 'dark' || (stored === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="page-body font-sans antialiased">
        <MixpanelInit />
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "8679226";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=8679226&fmt=gif"
          />
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
