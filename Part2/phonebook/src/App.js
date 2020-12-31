import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([{ name: ''}])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchName, setSearchName ] = useState('')

    const hook = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }

    useEffect(hook, [])

    const searchedPersons = persons.filter(
        (person) =>
            person.name.toLowerCase().includes(searchName.toLowerCase())
    );

    const addPerson = (event) => {
        event.preventDefault()

        const nameExists = persons.some((person) => person.name === newName);

        if(nameExists)
            window.confirm(`${newName} is already added to the phonebook`);
        else {
            const personObject = {
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearchName(event.target.value)
        console.log(searchName)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                searchName={searchName}
                handleSearchChange={handleSearchChange}
            />
            <h2>add a new</h2>
            <PersonForm
                addPerson = {addPerson}
                newName = {newName}
                handleNameChange = {handleNameChange}
                newNumber = {newNumber}
                handleNumberChange = {handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons
                searchedPersons={searchedPersons}
            />
        </div>
    )
}

export default App