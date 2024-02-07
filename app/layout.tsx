import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "ChamberCheck",
  description: "Rate Your Local Restaurant Restroom!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen relative md:pb-36 pb-[500px]">
        <main>
          <SessionProvider session={session}>
            <Header />
            {children}
            <Footer />
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
