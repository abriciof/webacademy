import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./components/BootstrapClient";
import Navbar from "./components/Navbar";
import { ReactQueryClientProvider } from "./components/ReactQueryClientProvider";

export const metadata: Metadata = {
  title: "WA Loja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <body>
        <ReactQueryClientProvider>
          <Navbar />
          {children}
          <BootstrapClient />
        </ReactQueryClientProvider>
        </body>
    </html>
  );
}
