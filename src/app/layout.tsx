import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ABDC - Association pour la Bienfaisance et le Développement Communautaire",
  description: "ABDC - Penser Globalement, Agir localement. Organisation non gouvernementale à Djibouti (Quartier 5 et Balbala).",
  keywords: ["ABDC", "Djibouti", "Bienfaisance", "Développement Communautaire", "Quartier 5", "Balbala"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
