import MainHeader from "@/app/components/ui/home/MainHeader";

export default function MainLayout({ children }) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}
