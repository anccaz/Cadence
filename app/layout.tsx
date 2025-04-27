// app/layout.tsx
import './globals.css'; // Import global styles here
import LeftSidebar from '@/components/shared/LeftSidebar';
import Topbar from '@/components/shared/Topbar';
import Bottombar from '@/components/shared/Bottombar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <LeftSidebar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Topbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Bottombar />
          </div>
        </div>
      </body>
    </html>
  );
}
