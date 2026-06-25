import React, { useState } from "react";
import "./InputForm.css";
import NoteItem from "./NoteItem";

export default function InputForm() {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddNote = () => {
    if (inputValue.trim() !== "") {
      const newNote = { date: new Date(), text: inputValue.trim() };
      setNotes([newNote, ...notes]);
      setInputValue("");
    }
  };

  const handleDeleteNote = (index) => {
    confirm("Are you sure you want to delete this note?") &&
      setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="input-form">
        <textarea
          className="input-textarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Your note..."
        />
        <button type="submit" className="add-button" onClick={handleAddNote}>
          Add
        </button>
      </div>
      <ul className="notes-list">
        {notes.map((note, index) => (
          <NoteItem
            key={index}
            note={note}
            onDelete={() => handleDeleteNote(index)}
          />
        ))}
      </ul>
    </>
  );
}
