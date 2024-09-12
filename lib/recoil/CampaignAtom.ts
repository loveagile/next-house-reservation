import { atom } from "recoil";
import { initialCampaign } from "@/utils/types";

export const CampaignAtom = atom({
  key: "CampaignAtom",
  default: initialCampaign,
});
