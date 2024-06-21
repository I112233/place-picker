import React, { useState, useRef, useEffect } from "react";
import Header from "./Components/Header/Header";
import Places from "./Components/Places/Places";
import { AVAILABLE_PLACES } from "./data";
import Modal from "./Components/Modal/Modal";
import DeleteConfirmation from "./Components/DeleteConfirmation/DeleteConfirmation";
import { sortPlacesByDistance } from "./location";

const storedIds = JSON.parse(localStorage.getItem("selectedPlace")) || [];
const storedPlaces = storedIds.map((id) =>
    AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
    const modal = useRef();
    const selectedPlace = useRef();
    const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
    const [availablePlaces, setAvailablePlaces] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const sortedPlaces = sortPlacesByDistance(
                AVAILABLE_PLACES,
                position.coords.latitude,
                position.coords.longitude
            );
            setAvailablePlaces(sortedPlaces);
        });
    }, []);

    function handleStartRemovePlace(id) {
        modal.current.open();
        selectedPlace.current = id;
    }

    function handleStopRemovePlace() {
        modal.current.close();
    }

    function handleSelectPlace(id) {
        setPickedPlaces((prevPickedPlaces) => {
            if (prevPickedPlaces.some((place) => place.id === id)) {
                return prevPickedPlaces;
            }
            const place = AVAILABLE_PLACES.find((place) => place.id === id);
            return [place, ...prevPickedPlaces];
        });
        const storedIds = JSON.parse(localStorage.getItem("selectedPlace")) || [];
        if (storedIds.indexOf(id) === -1) {
            localStorage.setItem("selectedPlace", JSON.stringify([id, ...storedIds]));
        }
    }

    function handleRemovePlace() {
        setPickedPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
        );
        modal.current.close();
        const storedIds = JSON.parse(localStorage.getItem("selectedPlace")) || [];
        localStorage.setItem(
            "selectedPlace",
            JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
        );
    }

    return (
        <>
            <Modal ref={modal}>
                <DeleteConfirmation
                    onConfirm={handleRemovePlace}
                    onCancel={handleStopRemovePlace}
                />
            </Modal>

            <Header />

            <main>
                <Places
                    title="I'd like to visit..."
                    fallBackText="Select the places you would like to visit below."
                    places={pickedPlaces}
                    onSelectPlace={handleStartRemovePlace}
                />
                <Places
                    title="Available places"
                    places={availablePlaces}
                    onSelectPlace={handleSelectPlace}
                />
            </main>
        </>
    );
}

export default App;
