import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "../styles/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "500", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Q — Know why you spend, not just where.",
  description:
    "Q is a behavioral finance app that shows why you spend. On-device, private, built for young people.",
  openGraph: {
    title: "Q — Know why you spend, not just where.",
    description:
      "Q is a behavioral finance app that shows why you spend. On-device, private, built for young people.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Q — Know why you spend, not just where.",
    description:
      "Q is a behavioral finance app that shows why you spend. On-device, private, built for young people.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a09",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
