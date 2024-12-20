function storeNote(note) {
  const savedNotes = JSON.parse(localStorage.getItem("notes" || null));
  if (!savedNotes) {
    note.id = 1;
    localStorage.setItem("notes", JSON.stringify([note]));
  } else {
    note.id = savedNotes.length++;
    localStorage.setItem("notes", JSON.stringify([...savedNotes, note]));
  }
}

function getNoteById(id) {
  const savedNotes = JSON.parse(localStorage.getItem("notes" || null));

  if (savedNotes) {
    return savedNotes.find((note) => note.id == id);
  }
  return null;
}

function getAllNotes() {
  return JSON.parse(localStorage.getItem("notes" || null));
}
function deleteNoteById(id) {
  const savedNotes = JSON.parse(localStorage.getItem("notes" || null));
  if (!savedNotes) return;
  const filteredNotes = savedNotes.filter((note) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(filteredNotes));
}
export { storeNote, getNoteById, getAllNotes, deleteNoteById };
