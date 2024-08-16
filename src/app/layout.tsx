import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-quill/dist/quill.snow.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Easy Documenter | Easily Create Professional Documentation for ThemeForest Themes & Templates",
  description:
    "Easily build responsive, SEO-friendly documentation for your ThemeForest themes and templates with our Document Builder app. Designed for developers and designers, our app offers intuitive live previews, and quick export options. Create user guides, installation manuals, and customization instructions that enhance your products and boost sales on ThemeForest. Simplify the documentation process and make your themes stand out in the marketplace.",
  keywords:
    "Document Builder, ThemeForest Documentation, SEO-Friendly Documentation, Responsive Documentation, Theme Customization Guides, Template Installation Manuals, User Guide Creator, Drag-and-Drop Document Builder, Professional Theme Documentation, Template Documentation Tool, Export Documentation for ThemeForest, Customizable Documentation Templates, Web Design Documentation, Theme Developer Tools, Documentation for WordPress Themes, Creative Market Documentation, HTML Template Documentation, CSS Documentation Builder, Theme Support Documentation, Online Document Creator",

  authors: {
    name: "Md Kayesh",
    url: "https://github.com/mdkayesh",
  },

  openGraph: {
    title:
      "Easy Documenter | Easily Create Professional Documentation for ThemeForest Themes & Templates",
    description:
      "Easily build responsive, SEO-friendly documentation for your ThemeForest themes and templates with our Document Builder app. Designed for developers and designers, our app offers intuitive live previews, and quick export options. Create user guides, installation manuals, and customization instructions that enhance your products and boost sales on ThemeForest. Simplify the documentation process and make your themes stand out in the marketplace.",
    url: "",
    siteName: "Easy Documenter",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
