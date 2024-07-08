import React from 'react'
import Places from '../Places/Places'

export default function AvailablePlaces({ onSelectPlace }) {
    return (
        <Places
            title="Available places"
            places={[]}
            onSelectPlace={onSelectPlace}
        />
    )
}
