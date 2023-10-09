import 'react-datepicker/dist/react-datepicker.css'
import './App.css'
import { SetStateAction, useState } from 'react'
import DatePicker from 'react-datepicker'
import { HistoryItem } from './types/HistoryItem'
import PeriodEvent from './components/PeriodEvent'
import Status from './components/Status'
import moment from 'moment'
import useLocalStorage from 'use-local-storage'

const App = () => {
  const [history, setHistory] = useLocalStorage<Array<HistoryItem>>('historyItemsV2', [])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const addToHistory = () => {
    if (selectedDate == null) {
      return
    }

    // This way fixes issue with date displayed in UTC and shifting 2 hours before, i.e. the day before at 2PM.
    const selectedMoment = moment.utc([selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()])
    if (history.length > 0 && !history[history.length-1].endDate) {
      // add end date to last item
      setHistory(previousHistory => {
        const newArray = previousHistory ? [...previousHistory] : []
        newArray[newArray.length-1].endDate = selectedMoment
        return newArray
      })
    } else {
       // add new item
      const newItem = {startDate: selectedMoment, endDate: undefined}
      setHistory(previousHistory => {
        const newArray = previousHistory ? [...previousHistory] : []
        newArray.push(newItem)
        return newArray
      })
    }
    setSelectedDate(null)
  }

  const removeFromHistory = (itemToRemove: HistoryItem) => {
    setHistory((old) => {
      const newHistory = new Set([...old || []])
      newHistory.delete(itemToRemove)
      return Array.from(newHistory)
    })
  }

  let minDate = null
  let text = null
  if (history.length == 0 || history[history.length-1].endDate) {
    text = 'Pick a start date'
  } else
  {
    minDate = history[history.length-1].startDate.toDate()
    text = 'Pick an end date'
  }

  return (
    <div>
      <h1>Moulin Rouge</h1>
      <div className='card'>
        {
          history && [...history].map((i: HistoryItem) => (
            <PeriodEvent
              key={JSON.stringify(i.startDate)}
              event={i}
              onDelete={() => removeFromHistory(i)}
            />
          ))
        }
      </div>
      <Status />
      <div className="card">
        <div>{text}</div>
        <DatePicker
          selected={selectedDate}
          name="datepicker"
          minDate={minDate}
          onChange={(date: SetStateAction<Date | null>) => { setSelectedDate(date) }}
          />
        <button onClick={addToHistory} disabled={!selectedDate} type="button" id="periodDate" aria-label='Add a new date'>Add</button>
      </div>
    </div>
  )
}

export default App
