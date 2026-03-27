import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Lee County Landscaping | Fort Myers, Cape Coral & Lee County FL",
  description: "Family-owned landscaping in Lee County, FL. Lawn care, landscape design, planting & more. Serving Fort Myers, Cape Coral, Bonita Springs & more. Free estimates!",
  keywords: ["landscaping Lee County Florida", "Fort Myers lawn care", "Cape Coral landscaping", "landscaper Bonita Springs FL", "lawn service Lee County"],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
