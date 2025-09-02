import { Tabbar } from "@/components/cashier/tabbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cashier Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Tabbar />
      <div className="h-[calc(100%-115px)]">{children}</div>
    </div>
  );
}
