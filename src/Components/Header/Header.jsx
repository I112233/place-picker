import React from 'react'
import logo from "../../assets/logo.png"
import "./Header.css"

export default function Header() {
    return (
        <header>
            <img src={logo} alt="globe" />
            <h1>Place Picker</h1>
            <p>Create your personal collection of places you would like to visit or you have visited.</p>
        </header>
    )
}
