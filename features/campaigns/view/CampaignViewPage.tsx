"use client";

import axios from "axios";
import PaginationItem from "@/components/molecules/PaginationItem/PaginationItem";
import Button from "@mui/material/Button";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { useEffect, useState } from "react";
import CampaignListItem from "@/components/organisms/CampaignListItem/CampaignListItem";
import { ICampaignListItem } from "@/components/organisms/CampaignListItem/CampaignListItem";
import SearchBar, {
  ISearchForm,
} from "@/components/molecules/SearchBar/SearchBar";
import Loading from "@/components/molecules/Loading/loading";

import "./CampaignViewPage.css";

export default function CampaignViewPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [campaignItems, setCampaignItems] = useState<ICampaignListItem[]>([]);
  const [selectedCampaignItems, setSelectedCampaignItems] = useState<
    ICampaignListItem[]
  >([]);
  const [searchData, setSearchData] = useState<ISearchForm>({
    keyword: "",
    type: "イベント種別 - 全て",
    status: "ステータス - 全て",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchCampaigns = async () => {
      const campaigns = await axios.post("/api/campaigns/view", {
        ...searchData,
      });
      setCampaignItems(campaigns.data);
      setIsLoading(false);
    };
    fetchCampaigns();
  }, [searchData]);

  useEffect(() => {
    const selectedItems = campaignItems.slice(
      currentPage * 10,
      (currentPage + 1) * 10
    );
    setSelectedCampaignItems(selectedItems);
  }, [campaignItems, currentPage]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-hover-green border-l-[6px] text-[20px] p-0 pl-2 mb-3 font-bold text-[#555]">
            まとめページ一覧
          </h1>
        </div>
        {/* New Campaign Create */}
        <div className="mb-6 flex justify-center">
          <Button
            className="new_campaign_btn"
            variant="contained"
            href="/campaigns/create"
          >
            <AddRoundedIcon className="plus_sign" />
            新しくまとめページを作成
          </Button>
        </div>

        <div className="bg-white grow w-full p-5">
          <SearchBar
            totalCounts={campaignItems.length}
            setSearchData={setSearchData}
          />

          {selectedCampaignItems.length ? (
            <div className="flex flex-col">
              <PaginationItem
                totalPages={Math.ceil(campaignItems.length / 10)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />

              {/* Campaign List */}
              <div className="grow">
                {selectedCampaignItems.map((campaignItem, index) => (
                  <CampaignListItem key={index} values={campaignItem} />
                ))}
              </div>

              <PaginationItem
                totalPages={Math.ceil(campaignItems.length / 10)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          ) : (
            <p className="bg-[#fcf8e3] border-[#faebcc] border-[1px] p-4 rounded-sm">
              イベントがありません
            </p>
          )}
        </div>
      </div>
    </>
  );
}
