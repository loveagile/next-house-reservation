"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";

import Loading from "@/components/molecules/loading";
import PaginationItem from "@/components/molecules/PaginationItem";
import CustomerListItem from "@/components/organisms/ListItem/CustomerListItem";
import AllCustomerDeleteBtn from "@/components/atoms/Button/AllCustomerDeleteBtn";
import CustomerSearchBar, { ICustomerSearchForm } from "@/components/molecules/SearchBar/CustomerSearchBar";

import { ICustomer } from "@/utils/types";

export default function CustomerViewPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [allCustomers, setAllCustomers] = useState<ICustomer[]>([]);
  const [customerItems, setCustomerItems] = useState<ICustomer[]>([]);
  const [selectedCustomerItems, setSelectedCustomerItems] = useState<ICustomer[]>([]);
  const [searchData, setSearchData] = useState<ICustomerSearchForm>({
    keyword: "",
    employee: "-- 担当者 --",
    status: "-- ステータス --",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      const customers = await axios.post("/api/customers/view");
      if (customers.status === 200) {
        setAllCustomers(customers.data);
        setCustomerItems(customers.data);
      }
      setIsLoading(false);
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const { keyword, employee, status } = searchData;
    let filteredItems = allCustomers;
    if (keyword) {
      filteredItems = filteredItems.filter(item => {
        const fullName = item.lastName + item.firstName || "";
        const furiName = item.seiName + item.meiName || "";
        const fullAddress = item.prefecture + item.city + item.street + item.building || "";

        if (fullName.includes(keyword) || furiName.includes(keyword)) return true;
        if (fullAddress.includes(keyword)) return true;
        if (item.phone?.includes(keyword)) return true;
        if (item.email?.includes(keyword)) return true;
        if (item.memo?.includes(keyword) || item.note?.includes(keyword)) return true;
        return false;
      })
    }

    if (employee !== "-- 担当者 --") {
      filteredItems = filteredItems.filter(item => item.employee === employee);
    }

    if (status !== "-- ステータス --") {
      filteredItems = filteredItems.filter(item => item.status === status);
    }

    setCustomerItems(filteredItems);
  }, [searchData])

  useEffect(() => {
    const selectedItems = customerItems.slice(
      currentPage * 20,
      (currentPage + 1) * 20
    );
    setSelectedCustomerItems(selectedItems);
  }, [customerItems, currentPage]);

  const handleDeleteItem = (id: number) => {
    const filteredItems = customerItems.filter(item => item.id !== id);
    setCustomerItems(filteredItems);
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl p-0 pl-2 mb-3 font-bold ">
            顧客リスト
          </h1>
          <p className="text-sm">
            予約のあった顧客は追加経路が「予約」と表示されます。<br></br>
            別途、既存客の追加、もしくは、手入力の場合は「インポート」と表示されます。
          </p>
        </div>

        <div className="flex flex-col bg-white grow w-full p-5">
          <CustomerSearchBar totalCounts={customerItems.length} setSearchData={setSearchData} />

          {/* New Customer */}
          <div className="mb-6">
            <Button
              variant="contained"
              href="/customers/create"
              sx={{
                fontSize: "16px",
                padding: "5px 15px",
                borderRadius: "1px",
              }}
            >
              <FaPlus />
              <span className="ml-1">追加</span>
            </Button>
          </div>

          {customerItems.length ? (
            <div className="flex flex-col grow">
              <PaginationItem
                totalPages={Math.ceil(customerItems.length / 20)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />

              {/* Reservation List */}
              <div className="grow bg-white w-full mt-2 mb-10">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal w-[100px]">ステータス</th>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal w-[130px]">リスト追加日</th>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal w-[110px]">追加経路</th>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal w-[115px]">顧客名</th>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal">住所 / 電話番号</th>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal w-[100px]">配信可否</th>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal w-[180px]">社内向け備考欄</th>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal w-[180px]">担当スタッフ</th>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal w-[100px]">変更</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCustomerItems.map((customerItem, index) => (
                      <CustomerListItem key={index}
                        item={customerItem}
                        setDeleteItemId={handleDeleteItem}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <PaginationItem
                totalPages={Math.ceil(customerItems.length / 20)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />

              <div className="flex justify-end">
                <AllCustomerDeleteBtn setCustomerItems={setCustomerItems} />
              </div>

            </div>
          ) : (
            <p className="bg-[#fcf8e3] border-[#faebcc] border-[1px] p-4 rounded-sm">
              顧客情報が見つかりませんでした。
            </p>
          )}
        </div>
      </div>
    </>
  );
}
