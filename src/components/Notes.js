import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NotesContext';
import NoteItems from './NoteItems';
import AddNote from './AddNote';

const Notes = () => {
    const { notes, fetchNotes } = useContext(NoteContext);

    useEffect(() => {
        // Fetch notes when the component mounts
        fetchNotes();
    }, [fetchNotes]); // Add fetchNotes to the dependency array

    return (
        <>
            <AddNote />
            <div className='row my-4 mx-3'>
                <h2 style={{ color: 'white', fontWeight: 'bold' }}>Your notes</h2>
                {/* Check if notes is an array and then map over it */}
                {Array.isArray(notes) && notes.map((note) => (
                    <NoteItems key={note._id} note={note} />
                ))}
            </div>
        </>
    );
}

export default Notes;
