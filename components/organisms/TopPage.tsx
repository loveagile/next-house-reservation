"use client";

import { BsInfoCircleFill } from "react-icons/bs";
import NewsDialog from "../molecules/Dialog/NewsDialog";

const news = [
  {
    date: "2024年07月30日(火)",
    // title: "夏季休業のお知らせ",
    // content: `平素は格別のお引き立てをいただき厚くお礼申し上げます。<br>
    // 弊社では、誠に勝手ながら下記日程を夏季休業とさせていただきます。<br><br>

    // ■夏季休業期間<br>8月13日(火)　～　8月15日(木)<br><br>

    // 休業期間中にいただいたお問合せについては、営業開始日以降に順次回答させていただきます。<br>
    // 皆様には大変ご不便をおかけいたしますが、何卒ご理解の程お願い申し上げます。`,
  },

  {
    date: "2024年07月22日(月)",
  },

  {
    date: "2024年07月16日(火)",
  },

  {
    date: "2024年07月12日(金)",
  },

  {
    date: "2024年05月24日(金)",
  },
  {
    date: "2024年05月24日(金)",
  },

  {
    date: "2024年04月12日(金)",
  },

  {
    date: "2024年02月20日(火)",
  },

  {
    date: "2024年02月20日(火)",
  },

  {
    date: "2024年02月08日(木)",
  },

  {
    date: "2024年02月05日(月)",
  }
];

const TopPage = () => {
  return (
    <div className="flex p-10 w-full">
      <div className="flex flex-col justify-center items-center p-10 bg-[#2563EB]">
        <BsInfoCircleFill className="text-white text-3xl" />
        <span className="text-center mt-3 text-white text-xl font-bold">
          運営からの<br></br>お知らせ
        </span>
      </div>

      <div className="bg-white grow p-5">
        {news.map((item, index) => (
          <div key={index} className="mt-3">
            <p className="text-[15px]">{item.date}</p>
            {/* <NewsDialog title={item.title} date={item.date} content={item.content} /> */}
            <NewsDialog title="" date={item.date} content="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopPage;