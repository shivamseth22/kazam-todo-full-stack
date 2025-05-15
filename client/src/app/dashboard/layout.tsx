import Sidebar from "@/components/landing/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1">{children}</div>
    </div>
  );
}
