import { HistoryItem } from "../types/HistoryItem";
import { Moment } from "moment";
import moment from "moment";

interface Props {
  history: Array<HistoryItem>;
}

const minDate = (d1: Moment, d2: Moment | undefined): Moment => {
  if (d2 === undefined) {
    return d1;
  }
  return moment.min(d1, d2);
};

const maxDate = (d1: Moment, d2: Moment | undefined): Moment => {
  if (d2 === undefined) {
    return d1;
  }
  return moment.max(d1, d2);
};

interface MonthSvgProps {
  daysInMonth: number;
  daysWithPeriod: Array<number>;
}

const MonthSvg = ({ daysInMonth, daysWithPeriod }: MonthSvgProps) => {
  const dayHeight = 15;
  const dayWidth = 7;
  const spacing = 2;
  return (
    <svg
      width="500"
      height="20"
      viewBox="0 0 300 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[...Array(daysInMonth).keys()].map((dayInMonth) => (
        <rect
          rx="2"
          key={dayInMonth}
          className={daysWithPeriod.includes(dayInMonth) ? "red" : "green"}
          x={dayInMonth * (dayWidth + spacing)}
          width={dayWidth}
          height={dayHeight}
          shape-rendering="geometricPrecision"
        />
      ))}
    </svg>
  );
};

const PeriodCalendar = ({ history }: Props) => {
  let firstStartDate: Moment | undefined = undefined;
  let lastEndDate: Moment | undefined = undefined;
  history.forEach((element) => {
    firstStartDate = minDate(moment.utc(element.startDate), firstStartDate);
    if (element.endDate)
      lastEndDate = maxDate(moment.utc(element.endDate), lastEndDate);
    else lastEndDate = maxDate(moment.utc(element.startDate), lastEndDate);
  });
  if (firstStartDate === undefined) return <div />;

  const startOfPeriod = moment(firstStartDate);
  startOfPeriod.startOf("month");

  const endOfPeriod = moment(lastEndDate);
  endOfPeriod.endOf("month").add(1, "M");

  const currentMonth = moment(startOfPeriod);
  const months = [];

  while (currentMonth < endOfPeriod) {
    months.push(
      <div key={JSON.stringify(currentMonth)}>
        <MonthSvg
          daysInMonth={currentMonth.daysInMonth()}
          daysWithPeriod={[6, 7, 8, 9, 10]}
        ></MonthSvg>
        {currentMonth.format("YYYY/MM")}
      </div>,
    );
    currentMonth.add(1, "M");
  }
  return (
    <div>
      <div className="history-item shared-flex-row">
        There are {history?.length} items.
        <br />
      </div>
      <div>{months}</div>
    </div>
  );
};

export default PeriodCalendar;
