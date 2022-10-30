import 'react-datepicker/dist/react-datepicker.css'
import './App.css'
import { SetStateAction, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import PeriodEvent from './PeriodEvent'
import moment from 'moment'

interface MoulinRougeData {
  historyItems: Set<moment.Moment>
}

const loadFromLocalStorage: () => MoulinRougeData = () => {
  console.log('Load from local storage')
  const storedData = window.localStorage.getItem('previousDates')
  if (storedData == null) {
    return { historyItems: new Set() }
  }
  const parsedData = JSON.parse(storedData) as MoulinRougeData
  return parsedData
}

const saveIntoLocalStorage = (data: MoulinRougeData) => {
  console.log('Save into local storage:', data.historyItems.size)
  const localStorageString = JSON.stringify(data)
  window.localStorage.setItem('previousDates', localStorageString)
}

const App = () => {
  const [history, setHistory] = useState<Set<moment.Moment> | undefined>(undefined)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => history && saveIntoLocalStorage({ historyItems: history }), [history])
  useEffect(() => setHistory(loadFromLocalStorage().historyItems), [])

  const addDateToHistory = () => {
    if (selectedDate == null || history == undefined) {
      return
    }
    setHistory((oldHistory) => {
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
          history && [...history].map((d) => (
            <PeriodEvent
              key={d.toString()}
              date={d}
              onDelete={() => setHistory((old) => {
                const newHistory = new Set([...old || new Set()])
                newHistory.delete(d)
                return newHistory
              })}
            />
          ))
        }
      </div>
      <div className="card">
        <DatePicker selected={selectedDate} name="datepicker" onChange={(date: SetStateAction<Date | null>) => setSelectedDate(date)} />
        <button onClick={addDateToHistory} type="button" id="periodDate" aria-label='Add a new date'>Add</button>
      </div>
    </div>
  )
}

export default App
