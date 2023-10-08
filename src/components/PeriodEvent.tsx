import moment from 'moment'

export type HistoryItem = {
  startDate: moment.Moment
  endDate: moment.Moment
}

interface Props {
  event: HistoryItem
  onDelete: () => void
}

const PeriodEvent = ({ event, onDelete }: Props) => {
  return (
    <div className="history-item shared-flex-row">
      <div>From {moment(event.startDate).format('DD/MM/YYYY')} to {moment(event.endDate).format('DD/MM/YYYY')}</div>
      <button type="button" onClick={onDelete} aria-label='Remove this date'>🗑️</button>
    </div>
  )
}

export default PeriodEvent

