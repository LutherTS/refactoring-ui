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
      <body className="bg-teal-50">{children}</body>
    </html>
  );
}

/* Notes
Overscroll doesn't care about gradients. Only background colors. That's why it defered the browser's light mode default of white when I was only using gradients, and to black when I also applied a bg-black. 
*/
