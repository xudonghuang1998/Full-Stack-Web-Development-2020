import React from "react";

const Filter = ({searchName, handleSearchChange}) => {
    return (
        <form>
            <div>
                find countries
                <input
                    value={searchName}
                    onChange={handleSearchChange}
                />
            </div>
        </form>
    );
};

export default Filter;