import PropTypes from "prop-types";
import { useState, useCallback } from "react";

const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState("");
  const characterLimit = 200;

  const handleTextChange = useCallback(
    (event) => {
      if (characterLimit - event.target.value.length >= 0) {
        setNoteText(event.target.value);
      }
    },
    [characterLimit]
  );

  const handleSaveButtonClick = useCallback(() => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
      setNoteText("");
    }
  }, [noteText, handleAddNote]);

  return (
    <div className="note new">
      <textarea
        rows="8"
        cols="10"
        placeholder="Type to add a note..."
        value={noteText}
        onChange={handleTextChange}
        aria-label="Type to add a note"
      ></textarea>
      <div className="note-footer">
        <small>{characterLimit - noteText.length} Remaining</small>
        <button className="save" onClick={handleSaveButtonClick}>
          Save
        </button>
      </div>
    </div>
  );
};

AddNote.propTypes = {
  handleAddNote: PropTypes.func.isRequired,
};

export default AddNote;
