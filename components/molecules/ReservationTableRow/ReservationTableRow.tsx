import ReservationTableCellItem from "../ReservationTableCellItem/ReservationTableCellItem";
import "./ReservationTableRow.css";

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
        <td key={index}></td>
      ))}
      {Array.from({ length: count }, (_, i) => i + startIndex).map(
        (value, index) => (
          <td key={index} className="calendar_column">
            <ReservationTableCellItem day={value} />
          </td>
        )
      )}
    </tr>
  );
};

export default ReservationTableRow;
