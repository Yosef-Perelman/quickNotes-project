import React from "react";
import "./NoteItem.css";

export default function NoteItem({ note, onDelete }) {
  return (
    <li className="note-item">
      <div className="note-header">
        <div className="note-date">{note.date.toLocaleString()}</div>
        <button className="delete-button" onClick={onDelete}>
          X
        </button>
      </div>
      {note.title && <div className="note-title">{note.title}</div>}
      <div className="note-text">{note.text}</div>
    </li>
  );
}
