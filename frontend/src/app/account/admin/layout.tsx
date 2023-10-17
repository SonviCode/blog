import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ReduxProvider from "@/redux/Provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Back office de Sonvic'o Blog",
  description: "Gestion des articles, des catégories, des utilisateurs...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={poppins.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
