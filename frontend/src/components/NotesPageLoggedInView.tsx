import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddEditNoteDialog from "./AddEditNoteDialog";
import { useEffect, useState } from "react";
import { Note as NoteModel } from "../models/note";
import styleUtils from "../styles/utils.module.css";
import * as NotesApi from "../network/notes_api";
import styles from "../styles/NotesPage.module.css";
import Note from "./Note";



const NotesPageLoggedInView = () => {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [notesLoading, setNotesLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

    useEffect(() => {
        const loadNotes = async () => {
            try {
                setShowNotesLoadingError(false);
                setNotesLoading(true);
                const notes = await NotesApi.fetchNotes();
                setNotes(notes);
            } catch (error) {
                console.error(error);
                setShowNotesLoadingError(true);
            } finally {
                setNotesLoading(false);
            }
        };
        loadNotes();
    }, []);

    const deleteNote = async (note: NoteModel) => {
        try {
            await NotesApi.deleteNote(note._id);
            setNotes(
                notes.filter((existingNote) => existingNote._id !== note._id)
            );
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    const notesGrid = (
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
            {notes.map((note) => (
                <Col key={note._id}>
                    <Note
                        note={note}
                        onNoteClicked={setNoteToEdit}                   // передаем функцию которая в компоненте Note будет выводить всплывающее окно когда нажимаем на зону task
                        onDeleteNoteClicked={deleteNote}                // передаем функцию удалить задачу
                        className={styles.note}
                    />
                </Col>
                )
            )}
        </Row>
    );

    return (
        <>
            <Button
                className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
                onClick={() => setShowAddNoteDialog(true)} // когда нажимаем на кнопку то ставим true на show окно и окно появляется
            >
                <FaPlus />
                Add new note
            </Button>
            {notesLoading && <Spinner animation="border" variant="primary" />}
            {showNotesLoadingError && (
                <p>Something went wrong. Please refresh the page</p>
            )}
            {!notesLoading && !showNotesLoadingError && (
                <>
                    {notes.length > 0 ? (
                        notesGrid
                    ) : (
                        <p>You don't have any notes yet</p>
                    )}
                </>
            )}
            {showAddNoteDialog && ( // когда нажали на кнопку "Add new note" появляется show окно
                <AddEditNoteDialog
                    onDismiss={() => setShowAddNoteDialog(false)} // передаем что нужно отключить всплывающее окно со значением false
                    onNoteSaved={(newNote) => {
                        setNotes([...notes, newNote]);
                        setShowAddNoteDialog(false); // поле чтобы окно закрывалось после нажатия save
                    }}
                />
            )}
            {noteToEdit && (
                <AddEditNoteDialog
                    noteToEdit={noteToEdit}
                    onDismiss={() => setNoteToEdit(null)}
                    onNoteSaved={(updatedNote) => {
                        setNotes(
                            notes.map((existingNote) =>
                                existingNote._id === updatedNote._id
                                    ? updatedNote
                                    : existingNote
                            )
                        );
                        setNoteToEdit(null); // поле чтобы окно закрывалось после нажатия save
                    }}
                />
            )}
        </>
    );
};

export default NotesPageLoggedInView;
