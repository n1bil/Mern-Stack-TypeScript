import { useEffect, useState } from 'react'
import './App.css'
import { Note } from './models/note'

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

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
    <div className='App'>
      {JSON.stringify(notes)}
    </div>
  )
}

export default App
