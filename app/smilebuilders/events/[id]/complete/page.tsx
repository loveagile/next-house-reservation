import EventCompletePage from "@/features/events/smilebuilders/EventCompletePage";
import FooterFC from "@/components/molecules/FooterFC";

export default function page() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <main className="flex w-full grow bg-white">
        <EventCompletePage />
      </main>
      <FooterFC />
    </div>
  );
}
