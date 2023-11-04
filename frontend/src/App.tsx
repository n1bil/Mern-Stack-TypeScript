import { useEffect, useState } from 'react'
import { Note as NoteModel } from './models/note'
import Note from './components/Note';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes", { method: "GET" });        
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <div>
      {notes.map(note => (
        <Note key={note._id} note={note} />
      ))}
    </div>
  )
}

export default App
