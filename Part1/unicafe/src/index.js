import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (<button onClick={props.handleClick}>{props.text}</button>)

const Statistic = (props) => {
    return (
        <tr>
        <td>{props.name}</td>
        <td>{props.value}</td>
        </tr>
    )
}

const Statistics = ({good,neutral,bad}) => {
    if (good + neutral + bad === 0)
        return <div>No feedback given</div>
    return (
        <table>
            <tbody>
            <Statistic name="good " value={good}/>
            <Statistic name="neutral " value={neutral} />
            <Statistic name="bad " value={bad} />
            <Statistic name="all " value={good + neutral + bad} />
            <Statistic name="average " value={(good - bad) / (good + neutral + bad)} />
            <Statistic name="positive " value={good / (good + neutral + bad) *100 + "%"} />
            </tbody>
        </table>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => setGood(good+1)} text="good" />
            <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)