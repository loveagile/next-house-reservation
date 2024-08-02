import { atom } from "recoil";

interface ICurrentItemProps {
  prefecture: string;
  address1: string;
  address2: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  eventDate: string;
  format: string;
  status: string;
  title: string;
  type: string;
  featuredEvent: string;
  imgUrl?: string;
  article: string;
}

const initialCampaignItem: ICurrentItemProps = {
  prefecture: "",
  address1: "",
  address2: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
  eventDate: "",
  format: "",
  status: "非公開(下書き)",
  title: "",
  type: "",
  featuredEvent: "",
  imgUrl: "",
  article: "",
};

export const CampaignAtom = atom({
  key: "campaignAtom",
  default: initialCampaignItem,
});
