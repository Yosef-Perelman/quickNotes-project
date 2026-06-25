import React, { useState } from "react";
import "./InputForm.css";

export default function InputForm() {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddNote = () => {
    if (inputValue.trim() !== "") {
      setNotes([inputValue, ...notes]);
      setInputValue("");
    }
  };

  return (
    <>
      <div className="input-form">
        <textarea
          className="input-textarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Your note"
        />
        <button type="submit" className="add-button" onClick={handleAddNote}>
          Add
        </button>
      </div>
      <ul className="notes-list">
        {notes.map((note, index) => (
          <li className="note-item" key={index}>
            {note}
          </li>
        ))}
      </ul>
    </>
  );
}
