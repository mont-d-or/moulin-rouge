import 'react-datepicker/dist/react-datepicker.css'
import './App.css'
import { SetStateAction, useState } from 'react'
import DatePicker from 'react-datepicker'
import { HistoryItem } from './components/PeriodEvent'
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

    if (history.length > 0 && !history[history.length-1].endDate) {
      // add end date to last item
      setHistory(previousHistory => {
        const newArray = previousHistory ? [...previousHistory] : []
        newArray[newArray.length-1].endDate = moment(selectedDate)
        return newArray
      })
    } else {
       // add new item
      const newItem = {startDate: moment(selectedDate), endDate: undefined}
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
        <DatePicker selected={selectedDate} name="datepicker" onChange={(date: SetStateAction<Date | null>) => setSelectedDate(date)} />
        <button onClick={addToHistory} disabled={!selectedDate} type="button" id="periodDate" aria-label='Add a new date'>Add</button>
      </div>
    </div>
  )
}

export default App
