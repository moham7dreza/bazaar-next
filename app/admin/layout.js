import Sidebar from "@/app/components/ui/admin/Sidebar";
import Header from "@/app/components/ui/admin/Header";


export default function AdminLayout({ children }) {
  return (
      <div className="flex min-h-screen">
        <div className="w-1/6 bg-[var(--sidebar-bg)] text-[var(--text-color)] p-4">
          <Sidebar />
        </div>

        <div className="w-5/6">
          <Header />
          <main className="content">{children}</main>
        </div>
      </div>
  );
}
