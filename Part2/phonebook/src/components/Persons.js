import React from "react";

const Persons = ({searchedPersons}) => {
    return (
        <ul>
            {searchedPersons.map((person,i) =>
                <li key={i}>
                    {person.name} {person.number}
                </li>
            )}
        </ul>
    );
};

export default Persons;