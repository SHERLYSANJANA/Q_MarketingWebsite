import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Q — Know why you spend, not just where.",
  description: "Q is a behavioral finance app that shows why you spend. On-device, private, built for young people.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0a0a09" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;500;700;800&display=swap" />
      </head>
      <body>
        {children}
        <Script src="/q.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
