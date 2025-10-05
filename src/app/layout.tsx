import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home | School Management",
  description: "School mangement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
      >
        {children}
      </body>
    </html>
  );
}
