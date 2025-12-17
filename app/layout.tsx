import type { Metadata } from "next";
import { 
  // Display & Headings
  Outfit,
  Space_Grotesk,
  Poppins,
  Raleway,
  Manrope,
  
  // Body Text
  Plus_Jakarta_Sans,
  Inter,
  Nunito,
  DM_Sans,
  Source_Sans_3,
  
  // Serif & Elegant
  Playfair_Display,
  Lora,
  Merriweather,
  
  // Monospace
  JetBrains_Mono,
  Fira_Code,
  
  // Handwriting
  Caveat,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// === Display & Headings ===
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

// === Body Text ===
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

// === Serif & Elegant ===
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

// === Monospace ===
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

// === Handwriting ===
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ourin - Next.js Boilerplate",
  description: "An opinionated collection of components, hooks, and utilities for your Next.js project.",
};

const fontVariables = [
  outfit, spaceGrotesk, poppins, raleway, manrope,
  jakarta, inter, nunito, dmSans, sourceSans,
  playfair, lora, merriweather,
  jetbrainsMono, firaCode,
  caveat,
].map(font => font.variable).join(' ');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased font-sans`}>
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

