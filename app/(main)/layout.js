import MainHeader from "../components/ui/home/MainHeader";

export default function MainLayout({ children }) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}
