import EventConfirmPage from "@/features/events/smilebuilders/EventConfirmPage";

export default function page() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <main className="flex w-full grow bg-white">
        <EventConfirmPage />
      </main>
    </div>
  );
}
