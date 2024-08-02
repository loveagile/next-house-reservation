import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import { useForm } from "react-hook-form";
import SelectBox from "@/components/molecules/SelectBox/SelectBox";

import { timesStr } from "@/utils/constants";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { includeEventDate } from "@/utils/convert";
import TableCellItem from "../TableCellItem/TableCellItem";
import "./TableRow.css";

interface ITableRowProps {
  emptyCount?: number;
  count: number;
  startIndex: number;
}

const TableRow: React.FC<ITableRowProps> = ({
  emptyCount = 0,
  count,
  startIndex,
}) => {
  return (
    <tr>
      {Array.from({ length: emptyCount }, (_, i) => i + 1).map((index) => (
        <td key={index}></td>
      ))}
      {Array.from({ length: count }, (_, i) => i + startIndex).map(
        (value, index) => (
          <td key={index}>
            <TableCellItem day={value} />
          </td>
        )
      )}
    </tr>
  );
};

export default TableRow;
