import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import Countries from "./components/Countries"

const App = () => {
    const [ countries, setCountries ] = useState([{ name: '', languages: []}])
    const [ searchName, setSearchName ] = useState('')
    const [ weather, setWeather ] = useState({ current: { temperature: '', weather_icons: '', wind_speed: '', wind_dir: ''}})

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }

    useEffect(hook, [])

    const hook2 = () => {
        if (searchedCountries.length == 0)
            return 0

        if (searchedCountries[0].capital) {
            console.log(searchedCountries[0].capital)
            axios
                .get(`http://api.weatherstack.com/current?access_key=86a2ed6dca288f870ac1469634f8ffc5&query=${searchedCountries[0].capital}`)
                .then(response => {
                    setWeather(response.data)
                })
        }
    }


    useEffect(hook2, [searchName])

    const searchedCountries = countries.filter(
        (country) =>
            country.name.toLowerCase().includes(searchName.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchName(event.target.value)
    }

    return (
        <div>
            <Filter
                searchName={searchName}
                handleSearchChange={handleSearchChange}
            />
            <Countries
                searchedCountries={searchedCountries}
                setSearchName={setSearchName}
                weather={weather}
            />
        </div>
    )
}

export default App