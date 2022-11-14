import moment from 'moment'

interface Props {
  date: moment.Moment
  onDelete: () => void
}

const PeriodEvent = ({ date, onDelete }: Props) => {
  return (
    <div className="history-item shared-flex-row">
      <div>{moment(date).format('DD/MM/YYYY')}</div>
      <button type="button" onClick={onDelete} aria-label='Remove this date'>X</button>
    </div>
  )
}

export default PeriodEvent
