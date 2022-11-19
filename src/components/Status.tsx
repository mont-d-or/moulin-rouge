import moment from 'moment'
import useLocalStorage from 'use-local-storage'

const Status = () => {

  const [history] = useLocalStorage<Array<number> | undefined>('historyItems', undefined)

  if (!history || history.length == 0) {
    return (<div/>)
  }
  return (
    <div className='card'>
      <div>Last periods: {moment(new Date(history[history.length - 1])).format('DD/MM/YYYY')}</div>
      <div>Next ones: {moment(new Date(history[history.length - 1])).add(28, 'days').format('DD/MM/YYYY')}</div>
    </div>
  )
}

export default Status