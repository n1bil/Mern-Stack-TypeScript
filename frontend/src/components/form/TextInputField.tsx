import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOption?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
}

const TextInputField = ( props: TextInputFieldProps ): JSX.Element => {
  return (
    <Form.Group className="mb-3" controlId={props.name + "-input"} >
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
            {...props.data}
            {...props.register(props.name, props.registerOption)}
            isInvalid={!!props.error}
        />
        <Form.Control.Feedback type="invalid">
            {props.error?.message}
        </Form.Control.Feedback>
    </Form.Group>
  )
}

export default TextInputField