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


// VISTO CHE EPIBOOKS è STATO UN ESERCIZIO MOLTO LUNGO, CHE NEL CORSO DEI VARI ESERCIZI HA CAMBIATO PIù VOLTE 
// LO STATO DEI VARI COMPONENTI, AD UN CERTO PUNTO NON ERA PIù CHIARO SE IL COMMENT AREA DOVESSE DIVENTARE O MENO 
// LA PAGINA DETTAGLI IO L'HO INTERPETATA COSì IN QUANTO ALTRIMENTI NON AVREBBE AVUTO SENSO AVERE LA PAGINA DETTAGLI 
// CHE AVREBBE FATTO LE STESSE COSE DELLA HOME CON LA COMMENT AREA, ANCHE PER UNA QUESTIONE ESTETICA.
// IL PROGETTO è COMPLETAMENTE RESPONSIVE. PER LE CHIAMATE PUT E DELETE, CHE ERANO FACOLTATIVE, HO DECISO DI SIMULARE 
// IL COMPORTAMENTO REALE OVVERO CHE SE SONO IO L'AUTORE ALLORA LO POSSO ELIMINARE O MODIFICARE,
// AVREBBE AVUTO POCO SENSO LASCIARLO CHE POTEVO ELIMINARE O MODIFICARE ANCHE QUELLI DEGLI ALTRI.
// OLTRE CHE RESPONSIVE HO VOLUTO ANCHE SODDISFARE IL PIù POSSIBILE L'ESPERIENZA UTENTE, CON AD ESEMPIO GLI ALERT MESSAGE
