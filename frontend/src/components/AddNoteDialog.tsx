import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";

interface AddNoteDialogProps {
    onDismiss: () => void;
    onNoteSaved: (note: Note) => void;
}

const AddNoteDialog = (props: AddNoteDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>();

    const onSubmit = async(input: NoteInput) => {
        try {
            const noteResponse = await NotesApi.createNote(input);
            props.onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={props.onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Note
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>                                     {/* делаем связь addNoteForm и вызывает onSubmit чтобы отправить данные на сервер*/}
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register("title", { required: "Required" })} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Text"
                            {...register("text")}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button 
                    type="submit" 
                    form="addNoteForm"
                    disabled={isSubmitting}
                >                                                       {/* делаем связь addNoteForm */}                    
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddNoteDialog;
