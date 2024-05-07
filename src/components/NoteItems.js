import React, { useState, useRef, useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NotesContext';

const Alert = ({ message, color }) => {
  const alertStyle = {
    backgroundColor: color,
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '999',
  };

  return (
    <div style={alertStyle}>
      {message}
    </div>
  );
};

const NoteItems = ({ note }) => {
  const { deleteNote, editNote } = useContext(NoteContext);
  const [editedNote, setEditedNote] = useState({ ...note });
  const editContainerRef = useRef(null);
  const viewContainerRef = useRef(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speakRef = useRef(null);

  const handleDelete = async () => {
    try {
      await deleteNote(note._id);
      setShowDeleteAlert(true);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
    setEditedNote({ ...note });
  };

  const handleSaveEdit = async () => {
    try {
      await editNote(editedNote._id, editedNote.title, editedNote.description, editedNote.tag);
      setShowUpdateAlert(true);
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to save edited note:", error);
    }
  };

  const handleChange = (e) => {
    setEditedNote({
      ...editedNote,
      [e.target.name]: e.target.value
    });
  };

  const handleOutsideClick = (e) => {
    if (editContainerRef.current && !editContainerRef.current.contains(e.target)) {
      setShowEditModal(false);
    }
    if (viewContainerRef.current && !viewContainerRef.current.contains(e.target)) {
      setShowViewModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    let deleteTimeout;
    if (showDeleteAlert) {
      deleteTimeout = setTimeout(() => {
        setShowDeleteAlert(false);
      }, 1000);
    }
    return () => clearTimeout(deleteTimeout);
  }, [showDeleteAlert]);

  useEffect(() => {
    let updateTimeout;
    if (showUpdateAlert) {
      updateTimeout = setTimeout(() => {
        setShowUpdateAlert(false);
      }, 1000);
    }
    return () => clearTimeout(updateTimeout);
  }, [showUpdateAlert]);

  const handleView = () => {
    setShowViewModal(true);
  };

  const handleSpeak = () => {
    if (!isSpeaking) {
      speakRef.current = new SpeechSynthesisUtterance(note.description);
      speakRef.current.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Microsoft Zira Desktop - English (United States)');
      speechSynthesis.speak(speakRef.current);
      setIsSpeaking(true);
    } else {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleCloseView = () => {
    setShowViewModal(false);
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="card my-3 mx-3 col-md-3" style={{ height: '200px', overflowY: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid #ccc', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', borderRadius: '10px', color: 'white' }}>
      <div className="card-body" style={{ maxHeight: '100%', overflowY: 'auto' }}>
        <>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text text-secondary font-smaller">Tag: {note.tag}</p>
          <p className="card-text">{note.description}</p>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-trash mx-2" onClick={handleDelete} style={{ cursor: 'pointer', color: 'red' }}></i>
            <i className="far fa-edit mx-2" onClick={handleEdit} style={{ cursor: 'pointer', color: 'green' }}></i>
            <i className="far fa-eye mx-2" onClick={handleView} style={{ cursor: 'pointer', color: 'blue' }}></i>
          </div>
          {showDeleteAlert && <Alert message="Note deleted successfully" color="red" />}
          {showUpdateAlert && <Alert message="Note updated successfully" color="green" />}
          {showEditModal && (
            <div className="external-modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', zIndex: '999', width: '80%', maxWidth: '500px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', color: 'white' }} ref={editContainerRef}>
              <h5 style={{ marginBottom: '20px' }}>Edit Note</h5>
              <input type="text" name="title" value={editedNote.title} onChange={handleChange} className="form-control mb-2" style={{ width: '100%', borderRadius: '5px', padding: '10px', border: '1px solid #ccc', marginBottom: '10px', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }} />
              <textarea name="description" value={editedNote.description} onChange={handleChange} className="form-control mb-2" style={{ width: '100%', height: '150px', borderRadius: '5px', padding: '10px', border: '1px solid #ccc', marginBottom: '10px', backgroundColor: 'rgba(255, 255, 255, 0.1)', resize: 'vertical', color: 'white' }}></textarea>
              <input type="text" name="tag" value={editedNote.tag} onChange={handleChange} className="form-control mb-2" style={{ width: '100%', borderRadius: '5px', padding: '10px', border: '1px solid #ccc', marginBottom: '10px', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }} />
              <button onClick={handleSaveEdit} className="btn btn-primary" style={{ borderRadius: '10px', padding: '10px 20px' }}>Save</button>
              <button onClick={() => setShowEditModal(false)} className="btn btn-secondary" style={{ borderRadius: '10px', padding: '10px 20px', marginLeft: '10px' }}>Close</button>
            </div>
          )}
          {showViewModal && (
            <div className="external-modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', zIndex: '999', width: '80%', maxWidth: '500px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', color: 'white' }} ref={viewContainerRef}>
              <h5 style={{ marginBottom: '20px' }}>View Note</h5>
              <p><strong>Title:</strong> {note.title}</p>
              <p><strong>Description:</strong> {note.description}</p>
              <p><strong>Tag:</strong> {note.tag}</p>
              <button onClick={handleSpeak} className="btn" style={{ borderRadius: '10px', padding: '10px 20px', marginTop: '20px' }}>
                <i className={`fas ${isSpeaking ? 'fa-volume-up' : 'fa-volume-mute'}`} style={{ color: 'white' }}></i>
              </button>
              <button onClick={handleCloseView} className="btn btn-secondary" style={{ borderRadius: '10px', padding: '10px 20px', marginTop: '20px', marginLeft: '10px' }}>Close</button>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default NoteItems;
