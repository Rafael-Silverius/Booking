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
          <header className="bg-gray-100 h-20 flex items-center justify-between px-20">
            <Logo />
            <Navigation />
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
