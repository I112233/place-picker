import React, { useState } from "react";
import Header from "./Components/Header/Header";
import Places from "./Components/Places/Places";
import { AVAILABLE_PLACES } from "./data";

function App() {
    const [pickedPlaces, setPickedPlaces] = useState([]);
    function handleSelectPlace(id) {
        setPickedPlaces((prevPickedPlaces) => {
            if (prevPickedPlaces.some((place) => place.id === id)) {
                return prevPickedPlaces
            }
            const place = AVAILABLE_PLACES.find((place) => place.id === id);
            return [place, ...prevPickedPlaces]
        });
    }

    return (
        <>
            <Header />
            <Places
                title="I'd like to visit..."
                fallBackText="Select the places you would like to visit below."
                places={pickedPlaces}
            />
            <Places
                title="Available places"
                places={AVAILABLE_PLACES}
                onSelectPlace={handleSelectPlace}
            />
        </>
    );
}

export default App;
