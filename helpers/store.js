function storeNote(note) {
  try {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (!savedNotes) {
      note.id = 1;
      localStorage.setItem("notes", JSON.stringify([note]));
    } else {
      note.id = savedNotes.length + 1;
      const preparedArr = [...savedNotes, note];
      localStorage.setItem("notes", JSON.stringify(preparedArr));
    }
  } catch (e) {
    throw new Error(e);
  }
}
function updateNote(id, data) {
  try {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    console.log(savedNotes);
    console.log(id, data);
    if (!savedNotes) {
      return;
    }
    const noteToUpdateInd = savedNotes.findIndex((el) => el.id == id);
    console.log(noteToUpdateInd);
    if (noteToUpdateInd === -1) return;
    savedNotes[noteToUpdateInd] = { ...savedNotes[noteToUpdateInd], ...data };
    console.log(savedNotes, "savedNotes");
    localStorage.setItem("notes", JSON.stringify(savedNotes));
  } catch (e) {
    throw new Error(e);
  }
}

function getNoteById(id) {
  try {
    const savedNotes = JSON.parse(localStorage.getItem("notes" || null));

    if (savedNotes) {
      return savedNotes.find((note) => note.id == id);
    }
    return null;
  } catch (e) {
    throw new Error(e);
  }
}

function getAllNotes() {
  try {
    return JSON.parse(localStorage.getItem("notes" || null));
  } catch (e) {
    throw new Error(e);
  }
}
function deleteNoteById(id) {
  try {
    const savedNotes = JSON.parse(localStorage.getItem("notes" || null));
    if (!savedNotes) return;
    const filteredNotes = savedNotes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
  } catch (e) {
    throw new Error(e);
  }
}
export { storeNote, getNoteById, getAllNotes, deleteNoteById, updateNote };
