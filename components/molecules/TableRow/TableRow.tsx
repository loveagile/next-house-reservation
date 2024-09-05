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
