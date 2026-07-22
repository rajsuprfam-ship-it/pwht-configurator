import "./globals.css";

export const metadata = {
  title: "SigmaWeld PWHT Configurator",
  description: "PWHT Configurator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}