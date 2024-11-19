import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import Footer from "@/components/footer/Footer";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "WikiBay",
  description: "WikiBay helps you make informed choices with in-depth reviews and comparisons of top software solutions, including VPNs, CRMs, AI tools, website builders, and more. Explore expert insights, user ratings, and affiliate recommendations tailored to your needs.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
       <main className="flex-grow">{children}</main> 
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
