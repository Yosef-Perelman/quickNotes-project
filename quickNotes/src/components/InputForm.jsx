import React, { useState, useRef } from "react";
import "./InputForm.css";
import NoteItem from "./NoteItem";
import NoteModal from "./NoteModal.jsx";

export default function InputForm() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    if (!saved) return [];
    return JSON.parse(saved).map((n) => ({ ...n, date: new Date(n.date) }));
  });
  const [inputValue, setInputValue] = useState("");
  const ref = useRef(null);
  const [title, setTitle] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [category, setCategory] = useState("personal");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

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
        category: category,
      };
      saveNotes([newNote, ...notes]);
      setInputValue("");
      setTitle("");
      setCategory("personal");

      const el = ref.current;
      el.style.height = "auto";
    }
  };

  const handleDeleteNote = (index) => {
    confirm("Are you sure you want to delete this note?") &&
      saveNotes(notes.filter((_, i) => i !== index));
  };

  const handleSaveEdit = (updatedNote) => {
    saveNotes(notes.map((n, i) => (i === editingIndex ? updatedNote : n)));
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
          <h1 className="app-title">Quick Notes</h1>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="song">Song</option>
            <option value="joke">Joke</option>
          </select>

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

        <div className="notes-list-container">
          <div className="category-choose-container">
            <div>Choose category to show:</div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="song">Song</option>
              <option value="joke">Joke</option>
            </select>
            <input
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
            />
          </div>

          <ul className="notes-list">
            {(() => {
              const q = searchQuery.trim().toLowerCase();
              return notes
                .map((note, originalIndex) => ({ note, originalIndex }))
                .filter(
                  ({ note }) =>
                    (categoryFilter === "all" || note.category === categoryFilter) &&
                    (!q ||
                      note.title?.toLowerCase().includes(q) ||
                      note.text?.toLowerCase().includes(q))
                )
                .map(({ note, originalIndex }) => (
                  <NoteItem
                    key={originalIndex}
                    note={note}
                    onDelete={() => handleDeleteNote(originalIndex)}
                    onEdit={() => setEditingIndex(originalIndex)}
                  />
                ));
            })()}
          </ul>
        </div>
      </div>
    </>
  );
}
