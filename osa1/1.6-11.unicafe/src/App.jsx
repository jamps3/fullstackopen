import { useState } from "react"

const Statistics = props => {
  console.log(props)
  if (props.all === 0) {
    return <div>No feedback given</div>
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine
            text="average"
            value={(props.good - props.bad) / props.all}
          />
          <StatisticLine
            text="positive"
            value={(props.good / props.all) * 100 + " %"}
          />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = props => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={good + neutral + bad}
      />
    </div>
  )
}

export default App
