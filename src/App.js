import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import BookDescription from "./pages/BookDescription";
import SearchContext from "./contexts/SearchText";



function App() {

  return (

    <>
      <SearchContext>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/bookdescription" element={<BookDescription />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SearchContext>
    </>

  );

}

export default App;
