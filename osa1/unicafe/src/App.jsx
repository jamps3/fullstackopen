import { useState } from "react"

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(1)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(1)

  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good - bad) / (good + neutral + bad)}</p>
      <p>positive {(good / (good + neutral + bad)) * 100} %</p>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
    </div>
  )
}

export default App
