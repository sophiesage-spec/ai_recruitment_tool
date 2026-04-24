import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { cn } from "~/lib/utils";
import { ReduxProvider } from "~/store/ReduxProvider";
import { TooltipProvider } from "~/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Umurava AI Talent Screener",
  description: "Automated job candidate screening and ranking dashboard powered by Gemini AI.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(inter.variable, jetbrainsMono.variable)}>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        <ReduxProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
