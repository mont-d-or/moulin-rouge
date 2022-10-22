import { useState } from 'react'
import './App.css'
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import { setDate } from 'date-fns'

const App = () => {
  const [previousDates, setPreviousDates] = useState<Array<Date>>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const addDateToPreviousDates = () => {
    if (selectedDate == null) {
      return
    }
    previousDates.push(selectedDate)
    setSelectedDate(null)
  }

  return (
    <div>
      <h1>Moulin Rouge</h1>
      <div>
        {
          previousDates.map(d => <div>{d.toDateString()}</div>)
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
