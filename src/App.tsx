import { useEffect, useState } from 'react'
import './App.css'
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import 'moment'
import moment from 'moment'

const loadFromLocalStorage: () => Array<moment.Moment> = () => {
  const loadedDates: Array<moment.Moment> = []
  const storedDates = window.localStorage.getItem('previousDates')
  if (storedDates != null) {
    loadedDates.push(...JSON.parse(storedDates).map((dateString: moment.MomentInput) => moment(dateString, "YYYY-MM-DD")))
  }
  return loadedDates
}

const saveIntoLocalStorage = (dates: Array<moment.Moment>) => {
  const localStorageString = JSON.stringify(dates.map((date) => date.format("YYYY-MM-DD")))
  window.localStorage.setItem('previousDates', localStorageString)
}

const App = () => {
  const [previousDates, setPreviousDates] = useState<Array<moment.Moment>>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    setPreviousDates(loadFromLocalStorage())
  }, [])

  const addDateToPreviousDates = () => {
    if (selectedDate == null) {
      return
    }
    previousDates.push(moment(selectedDate))
    setSelectedDate(null)
    saveIntoLocalStorage(previousDates)
  }

  return (
    <div>
      <h1>Moulin Rouge</h1>
      <div>
        {
          previousDates.map(d => <div key={d.toString()}>{d.format('DD-MM-YYYY')}</div>)
        }
      </div>
      <div className="card">
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
        <button onClick={addDateToPreviousDates}>Add</button>
      </div>
    </div>
  )
}

export default App
