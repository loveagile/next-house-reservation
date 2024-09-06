import TableCellItem from "./TableCellItem";

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
        <td key={index} className="font-bold w-[calc(100%/7)]"></td>
      ))}
      {Array.from({ length: count }, (_, i) => i + startIndex).map(
        (value, index) => (
          <td key={index} className="font-bold p-[10px] w-[calc(100%/7)]">
            <TableCellItem day={value} />
          </td>
        )
      )}
    </tr>
  );
};

export default TableRow;