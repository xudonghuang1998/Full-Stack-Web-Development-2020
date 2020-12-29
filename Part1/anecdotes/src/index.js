import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            break;
        default:
            return 0;
            break;
    }
}

const Button = (props) => (<button onClick={props.handleClick}>{props.text}</button>)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState([0,0,0,0,0,0])
    const id_max = votes.indexOf(Math.max(...votes))

    const handVotes = () => {
        const newVotes = [...votes]
        newVotes[selected]=newVotes[selected]+1
        setVotes(newVotes)
        }

    return (
        <div>
            <h1>Anecdotes of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <Button handleClick={handVotes} text="vote" />
            <Button handleClick={() => setSelected(randomNum(0,5))} text="next anecdote" />
            <h1>Anecdotes with most votes</h1>
            <p>{props.anecdotes[id_max]}</p>
            <p>has {votes[id_max]} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)