import CampaignPreviewPage from "@/features/campaigns/CampaignPreviewPage";
import FooterFC from "@/components/molecules/Footer/FooterFC";

export default function page() {
  return (
    <>
      <main className="flex w-full min-h-screen grow bg-white">
        <CampaignPreviewPage />
      </main>
      <FooterFC />
    </>
  );
}
