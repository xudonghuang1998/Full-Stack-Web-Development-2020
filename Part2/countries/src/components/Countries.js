import React from 'react'

const Countries = ({searchedCountries, setSearchName, weather}) => {

    if (searchedCountries.length > 10)
        return <div>Too many matches, specify another filter</div>

    if (searchedCountries.length === 1)
        return (
            <div>
                <h1>{searchedCountries[0].name}</h1>
                <p>capital {searchedCountries[0].capital}</p>
                <p>population {searchedCountries[0].population}</p>
                <h2>languages</h2>
                <ul>
                    {searchedCountries[0].languages.map((language, i) =>
                        <li key={i}>
                            {language.name}
                        </li>
                    )}
                </ul>
                <img src={searchedCountries[0].flag} alt="" height={100}/>
                <h2>Weather in {searchedCountries[0].capital}</h2>
                <strong>temperature:</strong> {weather.current.temperature} Celcius<br/>
                <img src={weather.current.weather_icons} alt="" height={100}/><br/>
                <strong>wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
            </div>
        )

    return (
        <ul>
            {searchedCountries.map((country,i) =>
                <li key={i}>
                    {country.name}
                    <button onClick={() => setSearchName(country.name)}>"show"</button>
                </li>
            )}
        </ul>
    );
};

export default Countries;