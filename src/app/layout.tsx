import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ToastProvider } from "@/components/ui/Toast";
import { FitLogProvider } from "@/context/FitLogContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FitLog — Workout Library",
    template: "%s · FitLog",
  },
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
  keywords: ["fitness", "workout", "gym log", "training plan", "FitLog"],
  openGraph: {
    title: "FitLog — Workout Library",
    description:
      "Pick a lift, lock it into today's plan, and watch the week's work add up.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="min-h-dvh font-sans antialiased">
        <ToastProvider>
          <FitLogProvider>
            <div className="flex min-h-dvh flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </FitLogProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
