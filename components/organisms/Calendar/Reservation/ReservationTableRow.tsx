import ReservationTableCellItem from "./ReservationTableCellItem";

interface ITableRowProps {
  emptyCount?: number;
  count: number;
  startIndex: number;
}

const ReservationTableRow: React.FC<ITableRowProps> = ({
  emptyCount = 0,
  count,
  startIndex,
}) => {
  return (
    <tr>
      {Array.from({ length: emptyCount }, (_, i) => i + 1).map((index) => (
        <td key={index} className="p-[10px] font-bold w-[calc(100%/7)]"></td>
      ))}
      {Array.from({ length: count }, (_, i) => i + startIndex).map(
        (value, index) => (
          <td key={index} className="p-[10px] font-bold w-[calc(100%/7)]">
            <ReservationTableCellItem day={value} />
          </td>
        )
      )}
    </tr>
  );
};

export default ReservationTableRow;
