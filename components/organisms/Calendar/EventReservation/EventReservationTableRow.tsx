import EventReservationTableCellItem from "./EventReservationTableCellItem";

interface ITableRowProps {
  emptyCount?: number;
  count: number;
  startIndex: number;
}

const EventReservationTableRow: React.FC<ITableRowProps> = ({
  emptyCount = 0,
  count,
  startIndex,
}) => {
  return (
    <tr>
      {Array.from({ length: emptyCount }, (_, i) => i + 1).map((index) => (
        <td key={index} className="p-3 font-bold w-[calc(100%/7)] bg-gray-100 border-gray-300"></td>
      ))}
      {Array.from({ length: count }, (_, i) => i + startIndex).map(
        (value, index) => (
          <td key={index} className="p-3 font-bold w-[calc(100%/7)] border-gray-300">
            <EventReservationTableCellItem day={value} />
          </td>
        )
      )}
      {0 < emptyCount + count && emptyCount + count < 7 && (
        Array.from({ length: 7 - count }, (_, i) => i + 1).map(
          (index) => (
            <td key={index} className="p-3 font-bold w-[calc(100%/7)] bg-gray-100 border-gray-300"></td>
          )
        )
      )}
    </tr>
  );
};

export default EventReservationTableRow;
