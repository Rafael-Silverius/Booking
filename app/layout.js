import { Geist } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Logo from "@/components/Logo";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

export const metadata = {
  title: {
    template: "%s / Booking",
    default: "Home / Booking",
  },
  description: "Book your vacation easily, anywhere, with everyone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased `}>
      <body className={`${geistSans.className} min-h-screen flex flex-col`}>
        <AuthProvider>
          <header className="sticky top-0 z-50 bg-gray-100/94 backdrop-blur-md border-b border-gray-200 h-20">
            <div className="flex h-full items-center justify-between w-full max-w-7xl mx-auto px-6">
              <Logo />
              <Navigation />
            </div>
          </header>

          <main>{children}</main>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "10px",
                padding: "12px 16px",
              },
              success: {
                iconTheme: {
                  primary: "#16a34a",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#dc2626",
                  secondary: "#fff",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
