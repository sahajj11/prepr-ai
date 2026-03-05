import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs"; 
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
  title: "Prepr AI",
  description: "AI-powered voice interviews for professional job preparation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      appearance={{
        variables: {
          colorPrimary: '#4f46e5', // Indigo-600
          colorBackground: '#ffffff', 
          colorText: '#0f172a', // Slate-900
          colorInputBackground: '#f8fafc', // Slate-50
          colorInputText: '#0f172a',
        },
        elements: {
          // Glassmorphic Card Style
          card: {
            border: '1px solid rgba(226, 232, 240, 0.8)', // Slate-200 with transparency
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)',
            borderRadius: '1.5rem',
          },
          // Modern buttons
          socialButtonsBlockButton: {
            border: '1px solid #e2e8f0',
            '&:hover': {
              backgroundColor: '#f1f5f9',
            }
          },
          // Action links (e.g., "Sign in")
          footerActionLink: {
            color: '#4f46e5',
            fontWeight: '700',
            '&:hover': {
              color: '#4338ca',
            }
          },
          // Input fields matching your bright theme
          formFieldInput: {
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
          }
        }
      }}
    >
      <html lang="en">
        <body
          /* Removed bg-[#09090b] and added bg-white for the light theme */
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}