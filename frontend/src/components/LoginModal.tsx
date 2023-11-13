import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css"
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_errors";

interface LoginModalProps {
    onDismiss: () => void;
    onLoginSuccessful: (user: User) => void;
}

export const LoginModal = (props: LoginModalProps) => {

    const [errorText, setErrorText] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

    const onSubmit = async (credentials: LoginCredentials) => {
        try {
            const user = await NotesApi.login(credentials);
            props.onLoginSuccessful(user);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }

    return (
        <Modal show onHide={props.onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Log in
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {errorText &&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOption={{ required: "Required" }}
                        error={errors.username}
                    />
                    <TextInputField 
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOption={{ required: "Required" }}
                        error={errors.password}
                    />
                    <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={styleUtils.width100}
                    >
                        Log In
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
