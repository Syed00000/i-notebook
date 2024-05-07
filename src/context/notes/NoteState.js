import React, { useState, useEffect } from "react";
import NoteContext from "./NotesContext";
//import NoteItems from "./NoteItems";

const NoteState = (props) => {
    const host = "http://localhost:5000";

    // State to store the fetched notes
    const [notes, setNotes] = useState([]);

    // Function to fetch all notes from the backend
    const fetchNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyY2UxYWNiZjZlOWVhODc4MDAwZDVkIn0sImlhdCI6MTcxNDIyNjI5M30.MX3_7IF9lLsejePb1Mf8_CAYzWSS43P-I7Ptx05HJW8" // Replace with your auth token
                }
            });
            if (response.ok) {
                const data = await response.json();
                setNotes(data);
                console.log();
            } else {
                console.error("Failed to fetch notes");
            }
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        }
    };

    // Function to add a new note
    const addNote = async (title, description, tag) => {
        try {
            const data = { title, description, tag };
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyY2UxYWNiZjZlOWVhODc4MDAwZDVkIn0sImlhdCI6MTcxNDIyNjI5M30.MX3_7IF9lLsejePb1Mf8_CAYzWSS43P-I7Ptx05HJW8" // Replace with your auth token
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                fetchNotes(); // Fetch updated notes after adding
            } else {
                console.error("Failed to add note");
            }
        } catch (error) {
            console.error("Failed to add note:", error);
        }
    };

    // Function to delete a note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyY2UxYWNiZjZlOWVhODc4MDAwZDVkIn0sImlhdCI6MTcxNDIyNjI5M30.MX3_7IF9lLsejePb1Mf8_CAYzWSS43P-I7Ptx05HJW8" // Replace with your auth token
                }
            });
            if (response.ok) {
                fetchNotes(); // Fetch updated notes after deleting
            } else {
                console.error("Failed to delete note");
            }
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };

    // Function to edit a note
    const editNote = async (id, title, description, tag) => {
        try {
            const data = { title, description, tag };
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyY2UxYWNiZjZlOWVhODc4MDAwZDVkIn0sImlhdCI6MTcxNDIyNjI5M30.MX3_7IF9lLsejePb1Mf8_CAYzWSS43P-I7Ptx05HJW8" // Replace with your auth token
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                fetchNotes(); // Fetch updated notes after editing
            } else {
                console.error("Failed to edit note");
            }
        } catch (error) {
            console.error("Failed to edit note:", error);
        }
    };

    useEffect(() => {
        fetchNotes(); // Fetch notes when component mounts
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes, }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
