import "./globals.css";

export const metadata = {
  title: "Menu Manager",
  description: "Application to manage items in menu",
  viewport: "width=device-width, initial-scale=1",
  charset: "UTF-8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
