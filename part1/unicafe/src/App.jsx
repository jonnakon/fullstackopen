import { useState } from 'react'

const StatisticLine = (props) => {
  return(
  <table>
    <tbody>
      <tr><td>{props.text} {props.value}</td></tr>
    </tbody>
  </table>
  )}


const Statistics = (props) => {
  if (props.all === 0){
    return(
      <div><p>No feedback given</p></div>
    )
  }
  return(
    <div>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="all" value={props.all}/>
      <StatisticLine text="average" value={props.average}/>
      <StatisticLine text="positive" value={props.positive}/>
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () =>{
    const updatedGood = good+1
    const updatedAll = all+1
    setGood(updatedGood)
    setAll(updatedAll)
    setAverage(((updatedGood * 1) + (neutral * 0) + (bad*(-1)))/ updatedAll)
    setPositive(updatedGood/updatedAll*100)
    
  }
  const handleNeutralClick = () =>{
    const updatedNeutral = neutral+1
    const updatedAll = all+1
    setNeutral(updatedNeutral)
    setAll(updatedAll)
    setAverage(((good * 1) + (updatedNeutral * 0) + (bad*(-1)))/ updatedAll)
    setPositive(good/updatedAll*100)
  }
  const handleBadClick = () =>{
    const updatedBad = bad+1
    const updatedAll = all+1
    setBad(updatedBad)
    setAll(updatedAll)
    setAverage(((good * 1) + (neutral * 0) + (updatedBad*(-1)))/ updatedAll)
    setPositive(good/updatedAll*100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='Good'/>
      <Button handleClick={handleNeutralClick} text='Neutral'/>
      <Button handleClick={handleBadClick} text='Bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>

    </div>
  )
}

export default App