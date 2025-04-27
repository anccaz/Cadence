import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";

export const metadata = {
  title: "My App",
  description: "App description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <div className="app-container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Topbar />
            <div className="main-content" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div className="page-content" style={{ flex: 1 }}>
                {children}
              </div>
            </div>
            <Bottombar />
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
