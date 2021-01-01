import React, {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"

let length = 4

const App = () => {
    const [ persons, setPersons ] = useState([{ name: ''}])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchName, setSearchName ] = useState('')
    const [ success, setSuccess ] = useState(null)
    const [ error, setError ] = useState(null)
    let errorState = false

    const Success = ({ message }) => {
        if (message === null) {
            return null
        }
        return (
            <div className="success">
                {message}
            </div>
        )
    }

    const Error = ({ message }) => {
        if (message === null) {
            return null
        }
        return (
            <div className="error">
                {message}
            </div>
        )
    }

    const hook = () => {
        personService
            .getAll()
            .then(initialNotes => {
                setPersons(initialNotes)
            })
    }

    useEffect(hook, [])

    const searchedPersons = persons.filter(
        (person) =>
            person.name.toLowerCase().includes(searchName.toLowerCase())
    );

    const addPerson = async (event) => {
        event.preventDefault()

        const nameExists = persons.some((person) => person.name === newName)

        if (nameExists) {
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
                updatePerson()
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
                id: ++length
            }
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })

            setSuccess(
                `${newName} added!`
            )
            setTimeout(() => {
                setSuccess(null)
            }, 5000)
        }
    }

    const handleError = async ( changedPerson ) => {
        await setError(
            `${changedPerson.name} was already removed!`
        )
        setTimeout(() => {
            setError(null)
        }, 5000)
        setPersons(persons.filter((person) => person.id !== changedPerson.id))
    }

    const updatePerson = async () => {
        const existingperson = persons.find(person => person.name === newName)
        const changedPerson = {...existingperson, number: newNumber}
        await personService
            .update(existingperson.id, changedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            })
            .catch(e => {
                errorState = true
                handleError(changedPerson)
            })
        if(errorState){
            errorState = false
            return null
        }
        setSuccess(
            `New number ${newNumber} added to ${newName}!`
        )
        setTimeout(() => {
            setSuccess(null)
        }, 5000)
    };

    const deletePerson = (id,name) => {
        if (window.confirm(`Delete ${name} ?`)) {
            personService
                .del(id)
                .then(currentPersons => {
                    setPersons(currentPersons)
                })
            setSuccess(
                `${name} Deleted!`
            )
            setTimeout(() => {
                setSuccess(null)
            }, 5000)
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearchName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Success message={success} />
            <Error message={error} />
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
                deletePerson={deletePerson}
            />
        </div>
    )
}

export default App