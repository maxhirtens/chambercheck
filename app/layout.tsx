import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Rubik } from "next/font/google";

const font = Rubik({ subsets: ["latin"], weight: ["400"] });

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
      <body className={`${font.className} flex flex-col min-h-screen relative`}>
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
