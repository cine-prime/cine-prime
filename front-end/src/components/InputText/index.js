import Form from 'react-bootstrap/Form'

export default function TextControlsExample(props) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control placeholder={props.placeholder} />
      </Form.Group>
    </Form>
  );
}