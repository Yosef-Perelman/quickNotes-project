import React, { useState, useRef } from "react";
import "./InputForm.css";
import NoteItem from "./NoteItem";
import NoteModal from "./NoteModal.jsx";

export default function InputForm() {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const ref = useRef(null);
  const [title, setTitle] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    const el = ref.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleAddNote = () => {
    if (inputValue.trim() !== "") {
      const newNote = {
        date: new Date(),
        text: inputValue.trim(),
        title: title.trim(),
      };
      setNotes([newNote, ...notes]);
      setInputValue("");
      setTitle("");

      const el = ref.current;
      el.style.height = "auto";
    }
  };

  const handleDeleteNote = (index) => {
    confirm("Are you sure you want to delete this note?") &&
      setNotes(notes.filter((_, i) => i !== index));
  };

  const handleSaveEdit = (updatedNote) => {
    setNotes(notes.map((n, i) => (i === editingIndex ? updatedNote : n)));
    setEditingIndex(null);
  };

  return (
    <>
      <NoteModal
        note={editingIndex !== null ? notes[editingIndex] : null}
        opened={editingIndex !== null}
        onClose={() => setEditingIndex(null)}
        onSave={handleSaveEdit}
      />

      <div className="input-form-container">
        <div className="input-form">
          <h3 className="app-title">Quick Notes</h3>

          <input
            className="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="input-textarea"
            value={inputValue}
            ref={ref}
            onChange={(e) => handleInputChange(e)}
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
              onEdit={() => setEditingIndex(index)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
