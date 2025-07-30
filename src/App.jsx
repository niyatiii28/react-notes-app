import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NoteList";
import Search from "./components/Search";
import Header from "./components/Header";
import { notesData } from "./constant";

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes"));
    return savedNotes ? savedNotes : notesData;
  });

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    const isDarkMode = JSON.parse(localStorage.getItem("dark-mode"));
    return isDarkMode ? isDarkMode : false;
  });

  useEffect(() => {
    localStorage.setItem("react-notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [newNote, ...notes];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode ? "dark-mode" : "light-mode"}`}>
      <Header handleToggleDarkMode={setDarkMode} />
      <div className="hero container">
        <Search handleSearchNote={setSearchText} />

        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText.toLocaleLowerCase())
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
