import React, { useState, useEffect } from "react";
import { Modal, TextInput, Textarea, Button } from "@mantine/core";

export default function NoteModal({ note, opened, onClose, onSave }) {
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState("");

  useEffect(() => {
    if (note) {
      setEditTitle(note.title || "");
      setEditText(note.text);
      setEditCategory(note.category);
    }
  }, [note]);

  const handleSave = () => {
    if (editText.trim() !== "") {
      onSave({
        ...note,
        title: editTitle.trim(),
        text: editText.trim(),
        category: editCategory,
      });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Note">
      <select
        value={editCategory}
        onChange={(e) => setEditCategory(e.target.value)}
      >
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="song">Song</option>
        <option value="joke">Joke</option>
      </select>

      <TextInput
        label="Title"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="Title"
        mb="sm"
      />

      <Textarea
        label="Note"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        placeholder="Your note..."
        autosize
        mb="sm"
      />

      <Button onClick={handleSave} fullWidth>
        Save
      </Button>
    </Modal>
  );
}
