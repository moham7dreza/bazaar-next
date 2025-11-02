import MainHeader from "../components/ui/home/MainHeader";
import {FilterProvider} from "@/app/contexts/FilterProvider";

export default function MainLayout({ children }) {
  return (
    <>
      <FilterProvider>
          <MainHeader />
          {children}
      </FilterProvider>
    </>
  );
}
