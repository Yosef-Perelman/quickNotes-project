import React, { useState, useEffect } from "react";
import { Modal, TextInput, Textarea, Button } from "@mantine/core";

export default function NoteModal({ note, opened, onClose, onSave }) {
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (note) {
      setEditTitle(note.title || "");
      setEditText(note.text);
    }
  }, [note]);

  const handleSave = () => {
    if (editText.trim() !== "") {
      onSave({ ...note, title: editTitle.trim(), text: editText.trim() });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Note">
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