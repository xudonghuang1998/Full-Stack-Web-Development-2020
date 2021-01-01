import React from "react";

const Persons = ({searchedPersons, deletePerson}) => {
    return (
        <ul>
            {searchedPersons.map((person,i) =>
                <li className='person' key={i}>
                    {person.name} {person.number}
                    <button onClick={() => {deletePerson(person.id, person.name)}}>delete</button>
                </li>
            )}
        </ul>
    );
};

export default Persons;