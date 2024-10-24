"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

import Loading from "@/components/molecules/loading";
import PaginationItem from "@/components/molecules/PaginationItem";
import CampaignListItem from "@/components/organisms/ListItem/CampaignListItem";
import SearchBar, { ISearchForm } from "@/components/molecules/SearchBar/SearchBar";

import { ICampaign } from "@/utils/types";
import { convEventStatus } from "@/utils/convert";

export default function CampaignViewPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [allCampaigns, setAllCampaigns] = useState<ICampaign[]>([]);
  const [campaignItems, setCampaignItems] = useState<ICampaign[]>([]);
  const [selectedCampaignItems, setSelectedCampaignItems] = useState<ICampaign[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [searchData, setSearchData] = useState<ISearchForm>({
    keyword: "",
    type: "イベント種別 - 全て",
    status: "ステータス - 全て",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const mainID = cookies['user'].id;
  const subID = cookies['user'].subId;
  const userID = subID !== -1 ? subID : mainID;

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);

      const res = await axios.post("/api/campaigns/view", {
        userID,
      });
      if (res.status === 200) {
        const campaigns = res.data;
        setAllCampaigns(campaigns);
        setCampaignItems(campaigns);
      }
      setCurrentPage(0);
      setIsLoading(false);
    };
    fetchCampaigns();
  }, []);

  useEffect(() => {
    const { keyword, type, status } = searchData;
    let filteredItems = allCampaigns;
    if (keyword) {
      filteredItems = filteredItems.filter(item => {
        const fullAddress = item.prefecture + item.address1 + item.address2;

        if (item.title && item.title.includes(keyword)) return true;
        if (fullAddress && fullAddress.includes(keyword)) return true;
        return false;
      })
    }

    if (type !== 'イベント種別 - 全て') {
      filteredItems = filteredItems.filter(item => item.type === type);
    }

    if (status !== "ステータス - 全て") {
      filteredItems = filteredItems.filter(item => {
        const convStatus = convEventStatus(item.status, JSON.parse(item.eventDate));
        if (status === "公開中") {
          return convStatus === "公開" || convStatus === "限定公開";
        }
        if (status === "公開中(開催終了)") {
          return convStatus === "公開(開催終了)";
        }
        if (status === "下書き中／非公開") {
          return convStatus === "非公開(下書き)";
        }
      });
    }

    setCampaignItems(filteredItems);
    setCurrentPage(0);
  }, [searchData])

  useEffect(() => {
    const selectedItems = campaignItems.slice(
      currentPage * 10,
      (currentPage + 1) * 10
    );
    setSelectedCampaignItems(selectedItems);
  }, [campaignItems, currentPage]);

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col w-full p-10">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
            まとめページ一覧
          </h1>
        </div>
        {/* New Campaign Create */}
        <div className="flex justify-center mb-6">
          <Link href="/campaigns/create"
            className="flex items-center px-7 py-[6px] rounded-[1px] bg-btn-color hover:opacity-90 text-white"
          >
            <FaPlus className="text-xl" />
            <span className="text-xl ml-1">新しくまとめページを作成</span>
          </Link>
        </div>

        <div className="flex flex-col grow bg-white w-full p-5">
          <SearchBar
            totalCounts={campaignItems.length}
            setSearchData={setSearchData}
          />

          {selectedCampaignItems.length ? (
            <div className="flex flex-col grow">
              <PaginationItem
                totalPages={Math.ceil(campaignItems.length / 10)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />

              {/* Campaign List */}
              <div className="grow">
                {selectedCampaignItems.map((campaignItem, index) => (
                  <CampaignListItem key={index} item={campaignItem} />
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
              まとめページがありません
            </p>
          )}
        </div>
      </div>
    )
  );
}
