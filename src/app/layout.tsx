import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phephetha Auto Centre | Car Parts & Service",
  description:
    "Phephetha Auto Centre - Your trusted destination for quality car parts, professional vehicle servicing, and expert automotive repairs in South Africa.",
  keywords: [
    "car parts",
    "auto service",
    "vehicle repair",
    "automotive",
    "South Africa",
    "brake repair",
    "oil change",
    "engine diagnostics",
  ],
  openGraph: {
    title: "Phephetha Auto Centre | Car Parts & Service",
    description:
      "Quality car parts, professional servicing, and expert automotive repairs.",
    type: "website",
    locale: "en_ZA",
    siteName: "Phephetha Auto Centre",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              <TooltipProvider>
                {children}
                <Toaster richColors position="bottom-right" />
              </TooltipProvider>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
