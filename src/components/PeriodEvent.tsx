import { HistoryItem } from "../types/HistoryItem";
import moment from "moment";

interface Props {
  event: HistoryItem;
  onDelete: () => void;
}

const PeriodEvent = ({ event, onDelete }: Props) => {
  const leftSide = "From " + moment(event.startDate).format("DD/MM/YYYY");
  const rightSide = event.endDate
    ? " to " + moment(event.endDate).format("DD/MM/YYYY")
    : " - still ongoing";
  return (
    <div className="history-item shared-flex-row">
      <span>
        {leftSide} {rightSide}
      </span>
      <button type="button" onClick={onDelete} aria-label="Remove this date">
        🗑️
      </button>
    </div>
  );
};

export default PeriodEvent;
