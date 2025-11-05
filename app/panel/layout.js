import PanelSidebar from "../components/ui/panel/PanelSidebar";

export default function PanelLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-full">
        <PanelSidebar />
        <main className="w-5/6">{children}</main>
      </div>
    </div>
  );
}
