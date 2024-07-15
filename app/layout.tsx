import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Refactoring UI",
  description: "Rework on the three videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
