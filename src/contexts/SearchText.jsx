import React, { createContext, useState } from 'react';

export const SearchText = createContext();


function SearchContext({ children }) {
    const [searchText, setSearchText] = useState("");

    return (
        <SearchText.Provider value={{ searchText, setSearchText }}>
            {children}
        </SearchText.Provider>
    );
}

export default SearchContext;