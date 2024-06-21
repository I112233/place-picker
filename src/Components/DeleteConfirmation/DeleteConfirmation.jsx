import React from "react";
import "./DeleteConfirmation.css";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
    return (
        <div className="delete-confirmation">
            <h2>Are you sure?</h2>
            <p>Do you really want to remove this place?</p>
            <div className="confirmation-actions">
                <button onClick={onConfirm} className="button">Yes</button>
                <button onClick={onCancel} className="button-text">No</button>
            </div>
        </div>
    );
}
