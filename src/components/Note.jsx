import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { MdDeleteForever } from "react-icons/md";
import ConfirmationModal from "./ConfirmationModal";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

const Note = ({ id, text, date, handleDeleteNote }) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    handleDeleteNote(id);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 1000); // 1 second delay to revert the icon
    });
  };

  // Clear the timeout when the component is unmounted
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="note">
      <span className="desc">{text}</span>
      <div className="note-footer">
        <small>{date}</small>
        <div className="action-btn">
          {copied ? (
            <FaClipboardCheck className="clipboard-icon copied" size="1.3em" />
          ) : (
            <FaClipboard
              onClick={handleCopyClick}
              className="clipboard-icon"
              size="1.3em"
            />
          )}
          <MdDeleteForever
            onClick={handleDeleteClick}
            className="delete-icon"
            size="1.5em"
          />
        </div>
      </div>
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this note?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

Note.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
};

export default Note;
