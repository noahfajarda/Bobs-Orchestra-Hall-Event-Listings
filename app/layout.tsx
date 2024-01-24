import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { UserContext } from "@/components/MediaPlayer/WidgetContext";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bob's Orchestra Hall Schedule",
  description: "View the latest events at Bob's Orchestra Hall",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserContext>
        <body className={quicksand.className + " overscroll-none"}>
          {children}
        </body>
      </UserContext>
    </html>
  );
}
