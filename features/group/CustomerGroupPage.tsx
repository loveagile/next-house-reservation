"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Loading from "@/components/molecules/loading";
import CustomerGroupSearchBar from "@/components/molecules/SearchBar/CustomerGroupSearchBar";
import CustomerGroupListItem from "@/components/organisms/ListItem/CustomerGroupListItem";
import PaginationItem from "@/components/molecules/PaginationItem";

import { ICustomer } from "@/utils/types";

export interface IGroupCustomer extends ICustomer {
  companyName: string;
}

const CustomerGroupPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [allCustomers, setAllCustomers] = useState<IGroupCustomer[]>([]);
  const [customerItems, setCustomerItems] = useState<IGroupCustomer[]>([]);
  const [selectedCustomerItems, setSelectedCustomerItems] = useState<IGroupCustomer[]>([]);

  const [keyword, setKeyword] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/groups/customer", {
        id: cookies['user'].id,
      });
      if (res.status === 200) {
        const customers = res.data;
        setAllCustomers(customers);
        setCustomerItems(customers);
      }
      setCurrentPage(0);
      setIsLoading(false);
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    let filteredItems = allCustomers;

    filteredItems = filteredItems.filter(item => {
      const fullName = item.lastName + item.firstName || "";
      const furiName = item.seiName + item.meiName || "";
      const fullAddress = item.prefecture + item.city + item.street + item.building || "";

      if (fullName.includes(keyword) || furiName.includes(keyword)) return true;
      if (fullAddress.includes(keyword)) return true;
      if (item.companyName?.includes(keyword)) return true;
      if (item.phone?.includes(keyword)) return true;
      if (item.email?.includes(keyword)) return true;
      if (item.memo?.includes(keyword) || item.note?.includes(keyword)) return true;
      return false;
    });

    setCustomerItems(filteredItems);
    setCurrentPage(0);
  }, [keyword]);

  useEffect(() => {
    const selectedItems = customerItems.slice(
      currentPage * 20,
      (currentPage + 1) * 20
    );
    setSelectedCustomerItems(selectedItems);
  }, [customerItems, currentPage]);

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col w-full p-10">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
            グループの顧客確認
          </h1>
          <p className="text-sm">
            グループに所属している顧客情報を確認することが出来ます
          </p>
        </div>

        <div className="flex flex-col w-full bg-white grow p-5">
          <CustomerGroupSearchBar totalCounts={customerItems.length} setKeyword={setKeyword} />
          <div className="flex flex-col grow">
            <PaginationItem
              totalPages={Math.ceil(customerItems.length / 20)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />

            <div className="grow bg-white w-full p-1">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-[25%] bg-[#2fa8b5] p-3 text-sm text-white font-normal">会社名</th>
                    <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal w-[130px]">リスト追加日</th>
                    <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal w-[110px]">追加経路</th>
                    <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal w-[115px]">顧客名</th>
                    <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal">住所 / 電話番号</th>
                    <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal w-[90px]">配信可否</th>
                    <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal w-[140px]">備考</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCustomerItems.map((customerItem, index) =>
                    <CustomerGroupListItem key={index} item={customerItem} />
                  )}
                </tbody>
              </table>
            </div>

            <PaginationItem
              totalPages={Math.ceil(customerItems.length / 20)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default CustomerGroupPage;