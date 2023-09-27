import React, { useContext } from "react";
import SingleBook from "../singleBook/SingleBook";
import { books } from "../../data/books";
import { SearchText } from "../../contexts/SearchText";

const LatestRelease = () => {

    const { searchText } = useContext(SearchText);

    return (
        <div className="container">

            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-wrap justify-content-evenly">
                            {
                                books.filter((book) => book.title.toLowerCase().includes(searchText)).map((book) => (
                                    <SingleBook key={book.asin} book={book} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LatestRelease;