import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";

export const metadata = {
  title: "My App",
  description: "App description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <div className="app-container" style={{ display: "flex", minHeight: "100vh" }}>
            <LeftSidebar />
            <div className="main-content" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Topbar />
              <div className="page-content" style={{ flex: 1 }}>
                {children}
              </div>
              <Bottombar />
            </div>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
