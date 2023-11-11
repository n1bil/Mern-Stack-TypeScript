import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import TextInputField from "./form/TextInputField";

interface AddEditNoteDialogProps {
    noteToEdit?: Note,
    onDismiss: () => void;
    onNoteSaved: (note: Note) => void;
}

const AddEditNoteDialog = (props: AddEditNoteDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: { 
            title: props.noteToEdit?.title || "",
            text: props.noteToEdit?.text || "",
        }
    });

    const onSubmit = async(input: NoteInput) => {
        try {
            let noteResponse: Note;
            if (props.noteToEdit) {
                noteResponse = await NotesApi.updateNote(props.noteToEdit._id, input);
            } else {
                noteResponse = await NotesApi.createNote(input);
            }

            props.onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (                                                                                    // show - чтобы отображалось окно когда, onHide - чтобы окно скрывалось когда нажимали на крест или всплывающего окна
        <Modal show onHide={props.onDismiss}>                                                           
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.noteToEdit ? "Edit note" : "Add note"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>                                     {/* делаем связь addNoteForm и вызывает onSubmit чтобы отправить данные на сервер*/}
                    <TextInputField 
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOption={{ required: "Required" }}
                        error={errors.title}
                    />

                    <TextInputField 
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />
                    
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button 
                    type="submit" 
                    form="addEditNoteForm"
                    disabled={isSubmitting}
                >                                                       {/* делаем связь addNoteForm */}                    
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEditNoteDialog;
