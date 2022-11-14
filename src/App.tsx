import 'react-datepicker/dist/react-datepicker.css'
import './App.css'
import { SetStateAction, useState } from 'react'
import DatePicker from 'react-datepicker'
import PeriodEvent from './components/PeriodEvent'
import Status from './components/Status'
import moment from 'moment'
import useLocalStorage from 'use-local-storage'

const App = () => {
  const [history, setHistory] = useLocalStorage<Array<moment.Moment> | undefined>('historyItems', undefined)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const addDateToHistory = () => {
    if (selectedDate == null) {
      return
    }
    setHistory((oldHistory) => {
      console.log(oldHistory || [])
      const newHistory = new Set<moment.Moment>(oldHistory || [])
      return [...newHistory.add(moment(selectedDate))]
    })
    setSelectedDate(null)
  }
  return (
    <div>
      <h1>Moulin Rouge</h1>
      <div className='card'>
        {
          history && history instanceof Array && [...history].map((d) => (
            <PeriodEvent
              key={d.toString()}
              date={d}
              onDelete={() => setHistory((old) => {
                const newHistory = new Set([...old || []])
                newHistory.delete(d)
                return [...newHistory]
              })}
            />
          ))
        }
      </div>
      <Status />
      <div className="card">
        <DatePicker selected={selectedDate} name="datepicker" onChange={(date: SetStateAction<Date | null>) => setSelectedDate(date)} />
        <button onClick={addDateToHistory} type="button" id="periodDate" aria-label='Add a new date'>Add</button>
      </div>
    </div>
  )
}

export default App
