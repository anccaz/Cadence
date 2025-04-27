// import './globals.css'; // or your global CSS file
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your App Title',
  description: 'Your description here',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}