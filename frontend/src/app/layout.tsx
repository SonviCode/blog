import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ReduxProvider from "@/redux/Provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.scss";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tom Sonvico Blog",
  description: "Blog personnel de Tom Sonvico - Montagne, Voyage, Code...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={poppins.className}>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
