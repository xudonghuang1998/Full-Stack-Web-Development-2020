import React from "react";

const Filter = ({searchName, handleSearchChange}) => {
    return (
        <form>
            <div>
                filter shown with:
                <input
                    value={searchName}
                    onChange={handleSearchChange}
                />
            </div>
        </form>
    );
};

export default Filter;