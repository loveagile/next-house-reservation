import EventCalendarPage from "@/features/events/smilebuilders/EventCalendarPage";
import FooterFC from "@/components/molecules/FooterFC";

export default function page() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <main className="flex w-full grow bg-white">
        <EventCalendarPage />
      </main>
      <FooterFC />
    </div>
  );
}
