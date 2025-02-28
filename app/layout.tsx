import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

// Set up Poppins font
const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
});

// Metadata for your site
export const metadata: Metadata = {
	title: "MCASH MEETING SCHEDULER",
	description:
		"Created by BCC STUDENTS",
	icons: {
		icon: "/favicon.ico", // Ensure this path is correct for your favicon
	},
};

// Root Layout function to wrap all pages
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
    <html lang="en" className={poppins.variable}>
      <body className={`font-poppins ${poppins.className}`}>
        {/* Render children components */}
        <Toaster
          toastOptions={{
            classNames: {
              error: "bg-red-500 border-none",
              success: "bg-green-500 border-none",
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
