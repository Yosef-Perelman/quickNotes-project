import React from "react";
import "./NoteItem.css";

export default function NoteItem({ note, onDelete, onEdit }) {
  return (
    <li className="note-item">
      <div className="note-delete-container">
        <button className="delete-button" onClick={onDelete}>
          X
        </button>
      </div>
      <div className="note-content" onClick={onEdit}>
        {note.title && <div className="note-title">{note.title}</div>}
        <div className="note-text">{note.text}</div>
        <div className="note-date">{note.date.toLocaleString()}</div>
      </div>
    </li>
  );
}
