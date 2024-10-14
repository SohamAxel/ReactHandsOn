import { Toaster } from "@/components/ui/toaster";
import { Outlet, ScrollRestoration } from "react-router-dom";
import RootNavbar from "@/layouts/RootNavbar";
import { ThemeProvider } from "@/Contexts/ThemeProvider";
import { AuthProvider } from "@/features/authentication/contexts/AuthProvider";

export function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          <RootNavbar />
          <div className="container my-4 flex-grow grid grid-cols-1">
            <div>
              <Outlet />
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
