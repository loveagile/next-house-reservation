import Link from "next/link";
import axios from "axios";
import { useState } from "react";

import Button from "@mui/material/Button";

import { FaPencilAlt } from "react-icons/fa";

import FormItemDelBtn from "@/components/atoms/Button/FormItemDelBtn";
import FormItemShowBtn from "@/components/atoms/Button/FormItemShowBtn";
import CancelBtn from "@/components/atoms/Button/CancelBtn";
import NotVisitedBtn from "@/components/atoms/Button/NotVisitedBtn";
import ChangeDateBtn from "@/components/atoms/Button/ChangeDateBtn";

import { IReserveDateTime } from "@/utils/types";
import { formatReservationDateToJapaneseString, formatSlashSplitDateString, getFormatDate } from "@/utils/convert";
import { IForm } from "@/utils/types";


interface ThisFCProps {
  formItem: IForm;
  setDeleteItem: (id: number) => void;
}

const FormListItem: React.FC<ThisFCProps> = ({ formItem, setDeleteItem }) => {
  const { id, formTitle, isHidden, formType } = formItem;

  return (
    <tr className="w-full">
      <td className="w-1/2 text-sm p-3">
        {formTitle}
      </td>
      <td className="text-sm p-3">{formType}</td>
      <td className="w-[130px] p-2 text-center">
        <FormItemShowBtn id={id} isHidden={isHidden} />
      </td>
      <td className="w-[90px] p-2 text-center">
        <Link href={`/settings/form/${id}/edit`}
          className="w-full inline-flex justify-center mb-1 items-center text-xs py-[6px] bg-[#2296f3] text-white hover:opacity-90 transition-all duration-300 ease-out"
        >
          <FaPencilAlt className="text-sm" />
          <span className="ml-[6px]">編集</span>
        </Link>
        <FormItemDelBtn id={id} setDeleteItem={setDeleteItem} />
      </td>
    </tr>
  );
};

export default FormListItem;