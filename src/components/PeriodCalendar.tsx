import { HistoryItem } from "../types/HistoryItem";
import { Moment } from "moment";
import moment from "moment";
import classNames from "classnames";

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
  firstMonthDay: Moment;
  eventsInMonth: Array<HistoryItem>;
}

const isDayInInterval = (
  intervalStart: Moment,
  intervalEnd: Moment,
  day: Moment,
): boolean => {
  return intervalStart.isSameOrBefore(day) && intervalEnd.isSameOrAfter(day);
};

const areDateOveralppingInterval = (
  interval1Start: Moment,
  interval1End: Moment,
  interval2Start: Moment,
  interval2End: Moment,
): boolean =>
  moment
    .max(interval1Start, moment(interval2Start))
    .isSameOrBefore(moment.min(interval1End, interval2End));

const MonthSvg = ({ firstMonthDay, eventsInMonth }: MonthSvgProps) => {
  const dayHeight = 15;
  const dayWidth = 7;
  const spacing = 2;
  return (
    <svg viewBox="-1 -1 280 17" xmlns="http://www.w3.org/2000/svg">
      {[...Array(firstMonthDay.daysInMonth()).keys()]
        .map((index) => index + 1)
        .map((dayInMonth) => {
          const currentItemDate = moment(firstMonthDay).date(dayInMonth);
          const hasEventOnDay = eventsInMonth.find((item: HistoryItem) =>
            isDayInInterval(
              moment(item.startDate),
              moment(item.endDate || item.startDate),
              currentItemDate,
            ),
          );
          const isToday = moment().isSame(currentItemDate, "day");
          return (
            <rect
              rx="2"
              key={dayInMonth}
              aria-label={dayInMonth.toString()}
              className={classNames({
                red: hasEventOnDay,
                green: !hasEventOnDay,
                active: isToday,
              })}
              x={(dayInMonth - 1) * (dayWidth + spacing)}
              width={dayWidth}
              height={dayHeight}
            />
          );
        })}
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
  endOfPeriod.endOf("month");

  const firstDayCurrentMonth = moment(startOfPeriod);
  const months = [];

  while (firstDayCurrentMonth < endOfPeriod) {
    const lastDayCurrentMonth = moment(firstDayCurrentMonth)
      .add(1, "M")
      .add(-1, "d");
    const eventsInMonth = history.filter((item) =>
      areDateOveralppingInterval(
        moment(item.startDate),
        moment(item.endDate || item.startDate),
        firstDayCurrentMonth,
        lastDayCurrentMonth,
      ),
    );

    months.push(
      <div key={JSON.stringify(firstDayCurrentMonth)}>
        <MonthSvg
          firstMonthDay={moment(firstDayCurrentMonth)}
          eventsInMonth={eventsInMonth}
        ></MonthSvg>
        {firstDayCurrentMonth.format("YYYY/MM")}
      </div>,
    );
    firstDayCurrentMonth.add(1, "M");
  }

  return (
    <div>
      <div className="history-item shared-flex-row">
        <br />
      </div>
      <div>{months}</div>
    </div>
  );
};

export default PeriodCalendar;
