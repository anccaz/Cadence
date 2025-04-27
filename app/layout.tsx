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
          <div className="app-container">
            <LeftSidebar />
            <div className="main-content">
              <Topbar />
              <div className="page-content">
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
