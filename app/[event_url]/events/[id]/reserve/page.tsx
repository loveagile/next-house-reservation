import EventReservePage from "@/features/events/smilebuilders/EventReservePage";

export default function page() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <main className="flex w-full grow bg-white">
        <EventReservePage />
      </main>
    </div>
  );
}
