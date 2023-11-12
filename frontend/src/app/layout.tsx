import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ReduxProvider from "@/redux/Provider";
import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["200", "300", "400", "600"], subsets: ["latin"] });

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
      <body className={`${poppins.className} body_wrapper`}>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
