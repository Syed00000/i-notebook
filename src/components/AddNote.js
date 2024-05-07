import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/NotesContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({
        title: '',
        description: '',
        tag: '', 
        checked: false
    });

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setNote({ ...note, checked: e.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', note);
        addNote(note.title, note.description, note.tag, note.checked); 
        setNote({
            title: '',
            description: '',
            tag: '',
            checked: false
        });
    };

    return (
        <div className='container-fluid p-0 rounded-lg'>
            <div className="container my-4 rounded-lg border-radius-20 p-4 glassmorphism" style={{ background: 'rgba(0, 0, 0, 0.8)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', backdropFilter: 'blur(4px)', borderRadius: '10px' }}>
                <h1 className="text-white">Add a note</h1>
                <form className='my-3 rounded-lg p-4' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label text-white">Title</label>
                        <input type="text" className="form-control glassmorphism" id="title" name="title" value={note.title} onChange={handleChange} style={{ color: '#fff', background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.3)' }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label text-white">Description</label>
                        <input type="text" className="form-control glassmorphism" id="description" name="description" value={note.description} onChange={handleChange} style={{ color: '#fff', background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.3)' }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label text-white">Tag</label>
                        <input type="text" className="form-control glassmorphism" id="tag" name="tag" value={note.tag} onChange={handleChange} style={{ color: '#fff', background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.3)' }} /> 
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" name="checked" checked={note.checked} onChange={handleCheckboxChange} />
                        <label className="form-check-label text-white" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary rounded-pill">Add Note</button>
                </form>
            </div>
        </div>
    );
};

export default AddNote;
