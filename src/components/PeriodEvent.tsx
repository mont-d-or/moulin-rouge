import { HistoryItem } from '../types/HistoryItem'
import moment from 'moment'

interface Props {
  event: HistoryItem
  onDelete: () => void
}

const PeriodEvent = ({ event, onDelete }: Props) => {
  return (
    <div className="history-item shared-flex-row">
      <span>From {moment(event.startDate).format('DD/MM/YYYY')} &nbsp;</span>
      { event.endDate ? <span>to {moment(event.endDate).format('DD/MM/YYYY')}</span> : 'still ongoing' }

      <button type="button" onClick={onDelete} aria-label='Remove this date'>🗑️</button>
    </div>
  )
}

export default PeriodEvent

