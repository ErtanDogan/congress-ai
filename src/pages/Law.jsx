import { useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'


// In Month D YYYY format: 2025-4-1 -> April 1 2025
// Does the splitting and the readable-ing
function fullFormatDate(date){
  let dash = date.indexOf("-")
  const year = date.slice(0, dash)
  date = date.slice(dash+1, date.length)
  dash = date.indexOf("-")
  const month = date.slice(0, dash)
  date = date.slice(dash+1, date.length)
  const day = date
  date = [parseInt(year), parseInt(month), parseInt(day)]
  const months = ['January', "February", 'March', 'April', "May", "June", "July", "August", "September", "October", "November", "December"]
  const textMonth = months[date[1] - 1]
  return textMonth + " " + date[2] + " " + date[0]
}   

function Law({mode, index, laws}){
    const law = laws[index]
    if(mode == "full"){
        return(
            <>
                <div class="law">
                    <h1><Link to={`/LawPage?index=${index}`} style={{textDecoration: 'none', color: 'black'}}>{law.title}</Link></h1>
                    <h3>{fullFormatDate(law.date)}</h3>
                    <p>{law.description}</p>
                </div>
            </>
        )
    } else if (mode == "short"){
        return(
            <>
                <div class="law">
                    <h1><Link to={`/LawPage?index=${index}`} style={{textDecoration: 'none', color: 'black'}}>{law.title}</Link></h1>
                    <h3>{fullFormatDate(law.date)}</h3>
                    <p>{law.short_description}</p>
                </div>
            </>
        )
    }
}

export default Law