import type { Metadata } from "next";
import { Navbar, Sidebar } from "./components";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "./components/protectedRoute";

export const metadata: Metadata = {
  title: "UniBus Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="grid grid-cols-10 min-h-screen">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-8 flex flex-col ml-2/12">
            <Navbar />
          <div className="flex-grow p-4">{children}</div>
        </div>
      </div>
    </AuthProvider>
  );
}
