import PropTypes from "prop-types";
import Note from "./Note";
import AddNote from "./AddNote";

const NoteList = ({ notes, handleAddNote, handleDeleteNote }) => {
  return (
    <div className="notes-list">
      <AddNote handleAddNote={handleAddNote} />
      {notes.map((note) => (
        <Note key={note.id} {...note} handleDeleteNote={handleDeleteNote} />
      ))}
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleAddNote: PropTypes.func.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
};

export default NoteList;
