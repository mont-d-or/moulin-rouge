import 'react-datepicker/dist/react-datepicker.css'
import './App.css'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import PeriodEvent from './PeriodEvent'
import moment from 'moment'


const loadFromLocalStorage: () => Set<moment.Moment> = () => {
  console.log('Load from local storage')
  const storedDates = window.localStorage.getItem('previousDates')
  const loadedDates: Set<moment.Moment> = new Set()
  if (storedDates != null) {
    (JSON.parse(storedDates) as string[]).forEach((dateString: moment.MomentInput) => loadedDates.add(moment(dateString, 'YYYY-MM-DD')))
  }
  return loadedDates
}

const saveIntoLocalStorage = (dates: Set<moment.Moment>) => {
  console.log('Save into local storage:', dates.size)
  const localStorageString = JSON.stringify([...dates].map((date) => date.format('YYYY-MM-DD')))
  window.localStorage.setItem('previousDates', localStorageString)
}

const App = () => {
  const [history, setHistory] = useState<Set<moment.Moment> | undefined>(undefined)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => history && saveIntoLocalStorage(history), [history])
  useEffect(() => setHistory(loadFromLocalStorage()), [])

  const addDateToHistory = () => {
    if (selectedDate == null || history == undefined) {
      return
    }
    setHistory(oldHistory => {
      const newHistory = new Set([...(oldHistory || new Set())])
      newHistory.add(moment(selectedDate))
      return newHistory
    })
    setSelectedDate(null)
  }

  return (
    <div>
      <h1>Moulin Rouge</h1>
      <div>
        {
          history && [...history].map(d =>
          <PeriodEvent
            key={d.toString()}
            date={d}
            onDelete={() => setHistory(old => {
              const newHistory = new Set([...old || new Set()])
              newHistory.delete(d)
              return newHistory
            })}/>)
        }
      </div>
      <div className='card'>
        <DatePicker selected={selectedDate} name='datepicker' onChange={date => setSelectedDate(date)} />
        <button onClick={addDateToHistory} type='button'>Add</button>
      </div>
    </div>
  )
}

export default App
