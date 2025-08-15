import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>{children}</div>
  );
}
