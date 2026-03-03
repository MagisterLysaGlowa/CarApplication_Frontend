import type { Metadata } from "next";
import "./globals.css";
import { Inter, Red_Hat_Display, Manrope, Montserrat } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Providers } from "./providers";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Witaj na Your Vehicle",
  description: "Witaj na Your Vehicle",
};

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-red-hat-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-manrope",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${redHatDisplay.variable} ${inter.variable} ${manrope.variable} ${montserrat.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
