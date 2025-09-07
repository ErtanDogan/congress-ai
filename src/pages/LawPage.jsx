import { useState } from 'react'
import '../App.css'
import Law from './Law.jsx'
import { Link, useSearchParams } from 'react-router-dom'

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

function LawPage({props, laws}){
    const [searchParams, setSearchParams] = useSearchParams();
    const index = searchParams.get('index')
    const law = laws[index]
    return (<>
        <div class="topbar">
            <h2 id="return"><Link to="/" style={{textDecoration: 'none', color: 'black'}}>Return</Link></h2>
        </div>
        <div class="main">
            <h1>{law.title}</h1>
            <h3>{fullFormatDate(law.date)}</h3>
            <p>{law.description}</p>
        </div>
    </>)

}

export default LawPage