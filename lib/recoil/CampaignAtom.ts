import { atom } from "recoil";
import { ICampaign } from "@/utils/types";

const initialCampaignItem: ICampaign = {
  id: -1,
  title: "",
  type: "",
  format: "",
  status: "非公開",
  eventDate: "",
  prefecture: "",
  address1: "",
  address2: "",
  hiddenAddress: "",
  featuredEvent: "",
  images: "",
  mainIndex: 0,
  article: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};

export const CampaignAtom = atom({
  key: "campaignAtom",
  default: initialCampaignItem,
});
