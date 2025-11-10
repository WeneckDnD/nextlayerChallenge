import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nextlayer Challenge",
  description: "Pomáhame mladým ľuďom premeniť nápady na skutočnosť. Zúčastni sa súťaže pre začínajúcich podnikateľov.",
  keywords: "súťaž, podnikanie, mladí podnikatelia, Nextlayer Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        {children}
      </body>
    </html>
  );
}
