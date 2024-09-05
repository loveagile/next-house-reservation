import EventPreviewPage from "@/features/events/EventPreviewPage";
import FooterFC from "@/components/molecules/Footer/FooterFC";

export default function page() {
  return (
    <>
      <main className="flex w-full min-h-screen grow bg-white">
        <EventPreviewPage />
      </main>
      <FooterFC />
    </>
  );
}
