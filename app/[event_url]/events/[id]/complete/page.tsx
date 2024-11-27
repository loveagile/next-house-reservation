import EventCompletePage from "@/features/events/smilebuilders/EventCompletePage";

export default function page() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <main className="flex w-full grow bg-white">
        <EventCompletePage />
      </main>
    </div>
  );
}
