import { useState, useEffect } from 'react'
import '../App.css'
import Law from './Law.jsx'
import { Link } from 'react-router-dom'

// Formats:
// date: YYYY-MM-DD (string)
// title: string
// description: string

function splitDate(date){
  let dash = date.indexOf("-")
  const year = date.slice(0, dash)
  date = date.slice(dash+1, date.length)
  dash = date.indexOf("-")
  const month = date.slice(0, dash)
  date = date.slice(dash+1, date.length)
  const day = date
  return [parseInt(year), parseInt(month), parseInt(day)]
  
}

function dateBefore(date2, date1, includeEnd=true){
  // if date2 is before or the same as date1
  if (date2[0] < date1[0]){
    return true
  } else if (date2[0] == date1[0] && date2[1] < date1[1]){
    return true
  } else if (date2[0] == date1[0] && date2[1] == date1[1] && date2[2] < date1[2]){
    return true
  } else if (includeEnd && date2[0] == date1[0] && date2[1] == date1[1] && date2[2] == date1[2]){
    return true
  } else {
    return false
  }
}

// To display the invalid dates message or for visual feedback to the player
function HandleShowingDates({startDate, endDate}){
  if (dateBefore(endDate, startDate, false)){
    return(<p>Dates invalid!</p>)
  } else {
    return(
      <>
        <p>Start: {readableDate(startDate)}</p>
        <pre>  </pre>
        <p>End: {readableDate(endDate)}</p>
      </>
    )
  }
}

// In Month D YYYY format: 2025-4-1 -> April 1 2025
function readableDate(date){
  const months = ['January', "February", 'March', 'April', "May", "June", "July", "August", "September", "October", "November", "December"]
  const month = months[date[1] - 1]
  return month + " " + date[2] + " " + date[0]
}

// Finds the laws in 'laws' and returns a list of them that area between (inclusive) the selected dates
function lawsBetweenDates(laws, startDate, endDate){
  let output = []
  
  for(let i = 0; i < laws.length; i++){
    let law = laws[i]
    let lawDate = splitDate(law.date)
    if(dateBefore(lawDate, endDate) && !dateBefore(lawDate, startDate, false)){
      output.push(i)
    }
  }
  return output
  
}


function Home({laws}) {
  const [startDate, changeStartDate] = useState([2025, 1, 1])
  const [endDate, changeEndDate] = useState([2026, 1, 1])
  
  console.log(laws)

  return (
    <>
      <div class="topbar">
        <input type="date" onChange={(event) => changeStartDate(splitDate(event.target.value))} defaultValue="2025-01-01"/> 
        <pre> </pre>
        <input type="date" onChange={(event) => changeEndDate(splitDate(event.target.value))} defaultValue="2026-01-01"/> 
        <pre>  </pre>
        <HandleShowingDates startDate={startDate} endDate={endDate} />
      </div>

      <div class="main">
        {lawsBetweenDates(laws, startDate, endDate).map((item, index) => (
          <Law mode={"short"} index={item} laws={laws}/>
        ))}
        
      </div>

    </>
  )
}

export default Home
