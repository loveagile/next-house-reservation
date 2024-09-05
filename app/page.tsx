import Sidebar from "@/components/molecules/SideBar/Sidebar";
import TopPage from "@/components/organisms/TopPage";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex min-h-screen grow ml-[240px]">
        <TopPage />
      </main>
    </div>
  );
}
