import React, { useContext, useState } from "react";
import SingleBook from "../singleBook/SingleBook";
import { books } from "../../data/books";
import { SearchText } from "../../contexts/SearchText";
import { useTheme } from "../../contexts/ThemeContext";

const LatestRelease = () => {


    const { theme } = useTheme();


    const { searchText } = useContext(SearchText);
    const [selectedAsin, setSelectedAsin] = useState(null);

    return (
        <div className={`${theme === 'light' ? '' : 'bg_costum'}`}>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-wrap justify-content-evenly my-5">
                            {books
                                .filter((book) => book.title.toLowerCase().includes(searchText))
                                .map((book) => (
                                    <SingleBook
                                        key={book.asin}
                                        book={book}
                                        selectedAsin={selectedAsin}
                                        setSelectedAsin={setSelectedAsin}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LatestRelease;

