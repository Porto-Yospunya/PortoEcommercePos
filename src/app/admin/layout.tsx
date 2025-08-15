import { Metadata } from "next";
import { Sidebar } from "@/components/admin/sidebar";
import { TopHeader } from "@/components/admin/top-header";

export const metadata: Metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full">
        <TopHeader />
        <div className="p-4 h-screen">{children}</div>
      </div>
    </div>
  );
}
