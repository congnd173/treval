import { Nunito } from "next/font/google";

import "./globals.css";

import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata = {
  title: "Treval",
  description: "final year project of nguyen duc cong",
};

const font = Nunito({
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/images/icon.ico" type="image/x-icon" />
      </head>
      <body className={font.className} suppressHydrationWarning={true}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
